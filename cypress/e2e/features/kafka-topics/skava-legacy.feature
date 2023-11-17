Feature: Skava to Legacy Topics Messages

    As Kafka producer,
    I want to check the messages passed through the topics,
    So the fulfillment of the contracts is guaranteed

    Background:
        Given I load the description file of the Contracts "SkavaMessageContracts.xlsx"

@mobile
    Scenario Outline: JSON Message "<reply_message>"
        Given I start the kafka-topic "<entity>"-"<topic>" flow by producing "<request_message>"
        When I consume the message "<reply_message>" with "<recordid>" set up to "<value>"
        Then The message should have the structure of the JSON "<reply_message>"

        Examples:
            | entity    | topic              | request_message             | reply_message                 | recordid     | value             |
            | orders    | orders             | OrderPlaced                 | OrderPlacedProcessed          | ylCustomerId | 5010              |
            | orders    | orders             | OrderReplaced               | OrderReplacedProcessed        | YLOrderId    | 0                 |
            | orders    | orders             | OrderReturned               | OrderReturnedProcessed        | YLOrderId    | null              |
            #| customers | customers          | SkavaAccountCreated         | SkavaAccountProcessed         | YLCustomerId | 4686341           |
            #| customers | customers          | SkavaAccountModified        | SkavaAccountProcessed         | ylCustomerId | 1040              |
            #| customers | customer-addresses | SkavaCustomerAddressCreated | SkavaCustomerAddressProcessed | referenceId  | 33278958_22973281 |
            #| customers | customer-addresses | SkavaCustomerAddressDeleted | SkavaCustomerAddressProcessed | referenceId  | 33278958_22973281 |
            #| customers | customer-addresses | SkavaCustomerAddressUpdated | SkavaCustomerAddressProcessed | referenceId  | 33278958_22973282 |