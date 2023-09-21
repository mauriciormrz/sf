Feature: Legacy to Skava Topics Messages

    As Kafka producer,
    I want to check the messages passed through the topics,
    So the fulfillment of the contracts is guaranteed

    Background:
        Given I load the description file of the Contracts "SkavaMessageContracts.xlsx"

    Scenario Outline: JSON Message "<reply_message>"
        Given I start the kafka-topic "<entity>"-"<topic>" flow by producing "<request_message>"
        When I consume the message "<reply_message>" with "<recordid>" set up to "<value>"
        Then The message should have the structure of the JSON "<reply_message>"

        Examples:
            | entity    | topic              | request_message             | reply_message                 | recordid    | value             |
            | customers | customer-addresses | SkavaCustomerAddressCreated | SkavaCustomerAddressProcessed | referenceId | 33278958_22973281 |

