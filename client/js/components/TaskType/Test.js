module.exports = {
  "_id": "56c6442eace1603414521ad2",
  "name": "3(21) Investment Adviser Monitoring",
  "purpose": "The purpose of this task is to ensure that the 3(21) Investment Adviser is properly performing the services agreed to in the service agreement, and that their fee is reasonable.",
  "process": "In order to complete this task, the plan fiduciary must do four things.\n\nFirst, the plan fiduciary must hold a 3(21) Investment Adviser Monitoring Meeting. In this meeting, the plan fiduciary will be responsible for reviewing the 3(21) Investment Adviser service agreement and determining whether the 3(21) Investment Adviser is performing all of the services as agreed. In addition to this, the plan fiduciary must benchmark the 3(21) Investment Adviser's fees and determine whether they are reasonable. When the meeting was held and who was in attendance should be documented.\n\nSecond, the plan fiduciary must upload meeting minutes.\n\nThird, the plan fiduciary must upload Investment Monitoring Materials.\n\nFourth, the plan fiduciary must upload fee benchmarking materials.",
  "outcomes": "The outcome of this task is that the 3(21) Investment Adviser is prudently monitored.",
  "taskCategoryId": "56bcb5511f3d76082bb8ef80",
  "conditionSets": [{
    "conditions": [{
      "entity": "funds",
      "attributes": [{
        "name": "planId",
        "value": "plan::planId"
      }, {
        "name": "fundType",
        "value": "Money Market"
      }],
    }],
    "steps": [{
      "type": "create",
      "entity": "task",
      "attributes": [{
        "name": "name",
        "value": "Distribute Safe Harbor Notices"
      }, {
        "name": "dueDate",
        "value": "date::endOfYear"
      }],
      "recursion": "yearly",
      "completionWindow": {
        "year": "1"
      }
    }]
  }],
  "createdBy": "56b27d80fd979e8824b0c7b6",
  "createdOn": "2016-02-18T22:22:38.000Z",
  "modifiedBy": "56cf4d5e89ddbfd343146ce8",
  "modifiedOn": "2016-03-04T23:06:46.839Z"
}
