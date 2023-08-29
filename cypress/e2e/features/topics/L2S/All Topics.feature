Feature: Topics Messages

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
            | db       | contract                        | QueueTable               | ins_col        | ins_value                          | recordid     | value     |
            | legacy   | YLAccountCreditBalanceUpdated   | CustBalanceChangeQueue   | ylCustomerId   | 435879                             | ylCustomerId | 435879    |
            | legacy   | YLAccountCreditLedger           | AccountCreditChangeQueue | paymentId      | 2352589                            | ylCustomerId | 313656    | 
            | legacy   | YLCustomerAddressUpdated        | CustAddrChangeQueue      | ylCustomerId   | 389674                             | ylCustomerId | 389674    |
            | legacy   | YLAccountUpdated                | CustomerChangeQueue      | ylCustomerId   | 426308                             | ylCustomerId | 426308    |
            | legacy   | YLAccountPointValueBalanceUpdat | RewardLedgerChangeQueue  | ylCustomerId   | 426586                             | ylCustomerId | 426586    |
            | legacy   | YLAccountLoyaltyLedger          | LoyaltyLedgerChangeQueue | rewardLedgerId | 984                                | ledgerItemId | 984       |
            | legacy   | OrderShipped                    | OrderShippedChangeQueue  | shipmentId     | 219094864                          | shipmentId   | 219094864 |
            | legacy   | OrderUpdated                    | OrderChangeQueue         | orderId        | 40682791                           | orderId      | 40682791  |
            
            #| payments | YLAccountPaymentACH             | AchChangeQueue           | achRecordId    | '0215C272619F454198E07F60B3BAF16E' | ylCustomerId | 14825525  |
            #| payments | YLAccountPaymentCard            | CreditCardChangeQueue    | ccRecordIds    | '40042DB32DC0974494EB5CEB3ABA3EEC' | ylCustomerId | 5010      |
            #| payments | YLAccountPaymentPayPal          | PayPalChangeQueue        | paypalRecordId | 'E5A2591D27590846B28381473A7614BE' | ylCustomerId | 3285599   |
           
            | legacy   | SkuPriceChanged                 | SkuPriceChangeQueue      | itemPriceId    | 11685                              | itemPriceId  | 11685     |
            | legacy   | SkuUpdated                      | SkuChangeQueue           | itemId         | 94                                 | partNumber   | 3351      |
            | legacy   | YLAccountSubscription           | ErTemplateChangeQueue    | autoshipId     | 120793094                          | autoshipId   | 120793094 |













