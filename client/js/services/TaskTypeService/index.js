var $ = require('jquery');
var S = require("string");
var moment = require('moment');
var Data = require('../PlanManagerService');
var TaskStore = require('../../stores/TaskStore');
var Entities = require('../ActionExecutor/entities');

function getPlanTasks (plan, callback) {
  TaskStore.get(function (tasks) {
    var result = [];
    tasks.map(function (task) {
      if (task.planId == plan._id) {
        result.push(task);
      }
    });
    callback(result);
  });
}

function generateObject(attributes, recursionDate) {
  var result = {};
  attributes.map(function (attribute) {
    if (attribute.name === "dateDue") {
      if (S(attribute.value).contains("::add::")) {
        var value = parseInt(attribute.value.split("::add::")[1].split("::")[0]);
        var addType = attribute.value.split("::add::")[1].split("::")[1];
        result[attribute.name] = moment(recursionDate.toString()).add(value, addType).toDate();
      } else if (S(attribute.value).contains("::subtract::")) {
        var value = parseInt(attribute.value.split("::subtract::")[1].split("::")[0]);
        var addType = attribute.value.split("::subtract::")[1].split("::")[1];
        result[attribute.name]= moment(recursionDate.toString()).subtract(value, addType).toDate();
      } else {
        result[attribute.name] = moment(recursionDate.toString()).toDate();
      }
      result.input = attribute.value;
    } else {
      result[attribute.name] = attribute.value;
    }
  });
  return result;
}

function meetsCriteria (plan, condition) {
  if (condition.entity === "plan") {
    var required = condition.attributes.length;
    var total = 0;
    condition.attributes.map(function (attribute) {
      console.log(attribute.name, plan[attribute.name], attribute.value);
      switch (attribute.comparisonType) {
        case "equal":
          if (plan[attribute.name].toString() == attribute.value.toString()) {
            total++;
          }
          break;
        case "not equal":
          if (plan[attribute.name].toString() != attribute.value.toString()) {
            total++;
          }
          break;
        case "less than":
          if (parseFloat(plan[attribute.name]) < parseFloat(attribute.value)) {
            total++;
          }
          break;
        case "greater than":
          if (parseFloat(plan[attribute.name]) > parseFloat(attribute.value)) {
            total++;
          }
          break;
        case "between":
          var planValue = parseFloat(plan[attribute.name]);
          var lowThreshold = parseFloat(attribute.value.split("::")[0]);
          var highThreshold = parseFloat(attribute.value.split("::")[1]);
          if (highThreshold < lowThreshold) {
            var low = lowThreshold;
            var high = highThreshold;
            lowThreshold = high;
            highThreshold = low;
          }
          if (planValue >= lowThreshold && planValue <= highThreshold) {
            total++;
          }
          break;
      }
    });
    return total === required;
  }
}

function recursionToDate(plan, frequency) {
  var month = moment(plan.planStartDate).format("MM");
  var day = moment(plan.planStartDate).format("DD");
  if (month === "02" && day === "29") {
    day = "28"; // I guess this works, lol...
  }
  var date = month + "/" + day + "/" + moment().format("YYYY");
  switch (frequency) {
    case "annual":
      return moment(date).add(12,"months").toDate();
    case "semi-annual":
      return moment(date).add(6,"months").toDate();
    case "quarterly":
      return moment(date).add(3,"months").toDate();
    default:
      return "";
  }
}

// don't create tasks that already exist
function createTask (plan, object) {
  getPlanTasks(plan, function (tasks) {
    var exists = false;
    tasks.map(function (task) {
      if (object.taskTypeId == task.taskTypeId
          && moment(object.dateDue).format("MM/DD/YYYY") == moment(task.dateDue).format("MM/DD/YYYY")) {
        exists = true;
      }
    });
    if (exists === false) {
      //console.log(object);
      Entities["task"].steps["create"](object);
    }
  });
}

// To do: Need to ensure that duplicate tasks are not created.
//        Need to make it so that tasks are created 2-3 years into the future.
function executeSteps (plan, steps, taskType) {
  steps.map(function (step) {
    var frequency = "";
    step.recursion.map(function (recursion) {
      if (frequency !== "") { return; }

      if (!recursion.conditions || recursion.conditions.length === 0) {
        frequency = recursion.value;
        return;
      }

      var required = recursion.conditions.length;
      var total = 0;
      recursion.conditions.map(function (condition) {
        if (meetsCriteria(plan, condition) === true) {
          total++;
        }
      });

      if (total === required) {
        frequency = recursion.value;
      }
    });
    var recursionDate = recursionToDate(plan, frequency);
    var object = generateObject(step.attributes, recursionDate, plan.planStartDate);
    object.frequency = frequency;
    object.taskTypeId = taskType._id;
    object.planId = plan._id;
    object.ownerId = plan.createdBy;

    // create tasks for the next 3 years
    switch (object.frequency) {
      case "annual":
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("1", "years").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);;
        object.dateDue = moment(object.dateDue.toString()).add("1", "years").toDate();
        createTask(plan,object);
        break;
      case "semi-annual":
        // 1 year
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("6", "months").toDate();
        createTask(plan,object);
        // 2 years
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("6", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("6", "months").toDate();
        createTask(plan,object);
        // 3 years
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("6", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("6", "months").toDate();
        createTask(plan,object);
        break;
      case "quarterly":
        // 1 year
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        // 2 years
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        // 3 years
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        var object = $.extend({}, object);
        object.dateDue = moment(object.dateDue.toString()).add("3", "months").toDate();
        createTask(plan,object);
        break;
      default:
        createTask(plan,object);
        break;

    }
  });
}

function TaskTypeService (planId) {
  this.execute = function (callback) {
    Data.plans.getOne(planId, function (plan) {
      Data.taskTypes.get(function (taskTypes) {
        taskTypes.map(function (taskType) {
          taskType.conditionSets.map(function (conditionSet) {
            if (conditionSet.conditions.length === 0) {
              executeSteps(plan, conditionSet.steps, taskType);
            } else {
              var required = conditionSet.conditions.length;
              var total = 0;
              conditionSet.conditions.map(function (condition) {
                if (meetsCriteria(plan, condition) === true) {
                  total++;
                }
              });
              if (total === required) {
                executeSteps(plan, conditionSet.steps, taskType);
              }
            }
          });
        });
      });
    });
  }
}

module.exports = TaskTypeService;
