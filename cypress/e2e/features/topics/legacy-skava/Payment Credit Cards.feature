Feature: Legacy to Skava Topics Messages

    As Kafka producer,
    I want to check the messages passed through the topics,
    So the fulfillment of the contracts is guaranteed

    Background:
        Given I load the description file of the Contracts "SkavaAccountMessageContracts.xlsx"

    Scenario Outline: JSON Message "<contract>": <ins_col>: <ins_value>
        Given I start the Topic's flows by inserting "<ins_value>" into "<QueueTable>" table in "<db>"
        When I consume the message "<contract>" with "<recordid>" set up to "<value>"
        Then The message should have the structure of the JSON "<contract>"

        Examples:
            | db       | contract             | QueueTable            | ins_col     | ins_value                          | recordid     | value |
            | payments | YLAccountPaymentCard | CreditCardChangeQueue | ccRecordIds | '40042DB32DC0974494EB5CEB3ABA3EEC' | ylCustomerId | 5010  |


# 772b106c-65f7-4ad4-ae86-aa172c7f33e3
# 3d0e4bc5-9a09-4876-baaf-1a36c1423146