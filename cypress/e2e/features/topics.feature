Feature: Topics Messages

    As Kafka producer,
    I want to check the messages passed through the topics,
    So the fulfillment of the contracts is guaranteed


    Scenario Outline: JSON Message contract:  "<contract>"
        Given I insert "<recordid>" in the "<QueueTable>" table
        When I consume the message with column "<field>" set up to "<recordid>"
        Then I should see the contract "<contract>"

        Examples:
            | contract         | QueueTable              | recordid  | field        |
            | YLAccountUpdated | CustomerChangeQueue     | 5010      | YLCustomerId |
            | OrderShipped     | OrdershippedChangeQueue | 212227009 | ShipmentId   |



