Feature: Legacy to Skava Topics Messages

    As Kafka producer,
    I want to check the messages passed through the topics,
    So the fulfillment of the contracts is guaranteed

    Background:
        Given I load the description file of the Contracts "SkavaMessageContracts.xlsx"

    Scenario Outline: JSON Message "<contract>": <ins_col>: <ins_value>
        Given I start the Topic's flows by inserting "<ins_value>" into "<QueueTable>" table in "<db>"
        When I consume the message "<contract>" with "<recordid>" set up to "<value>"
        Then The message should have the structure of the JSON "<contract>"

        Examples:
            | db     | contract                 | QueueTable          | ins_col      | ins_value | recordid     | value  |
            | legacy | YLCustomerAddressUpdated | CustAddrChangeQueue | ylCustomerId | 389674    | ylCustomerId | 389674 |









