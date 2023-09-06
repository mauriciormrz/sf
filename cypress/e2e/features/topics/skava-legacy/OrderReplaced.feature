Feature: Legacy to Skava Topics Messages

    As Kafka producer,
    I want to check the messages passed through the topics,
    So the fulfillment of the contracts is guaranteed

    Background:
        Given I load the description file of the Contracts "SkavaMessageContracts.xlsx"

    Scenario Outline: JSON Message "<reply_message>"
        Given I start the kafka-topic "<topic>" flow by producing "<request_message>"
        When I consume the message "<reply_message>" with "<recordid>" set up to "<value>"
        Then The message should have the structure of the JSON "<reply_message>"

        Examples:
            | topic  | request_message | reply_message          | recordid  | value     |
            | orders | OrderReplaced   | OrderReplacedProcessed | YLOrderId | 197177830 |

