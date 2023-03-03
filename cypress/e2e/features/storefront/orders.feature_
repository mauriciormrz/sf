Feature: Shopping
    As a YL customer,
    I want to add some items to the shopping cart,
    So I can place an order.

    Background:
        Given I am at the Login page
        And I log in to the Storefront with user "5010"  and password "Password1"

    Scenario Outline: Order Placed with "<shipping_method>" Shipping, "<payment_method>" Payment and Donation="<donation>"
        When I add the item to the shopping cart
            | sku  | item                   | quantity | price | pv    |
            | 3419 | RutaVaLa Essential Oil | 3        | 33.75 | 33.75 |
            #| 5203 | Lavender Lip Balm      | 1        | 4.25  | 4.25  |


        And I checkout the order with donation "<donation>"
        Then I fill the checkout form with "<shipping_method>" and "<payment_method>"
        And I should see the order confirmation "THANK YOU FOR SHOPPING YOUNG LIVING."

        Examples:
            | shipping_method    | payment_method | donation |
            | Economy            | Credit Card    | Yes      |
            #| Expedited          | PayPal         | No       |
            #| Lehi, UT Will Call | ACH            | Yes      |



#| 3419 | RutaVaLa Essential Oil | 2        | 33.75 | 33.75 |
#| 5203 | Lavender Lip Balm      | 1        | 4.25  | 4.25  |
#| 5178 | Lip Balm - Grapefruit  | 2        | 4.50  | 4.5   | Mejora: cuando producto no existe
#| 4710 | Ningxia Red Combo Pack | 3        | 158.0 | 158.0 | Revisar: Inventary no available
#| 3500 | Basil Essential Oil    | 2        | 26.50 | 26.5  |

#| Economy                    | Credit Card | No  |
#| Standard                   | ACH         | No  |
#| Expedited                  | PayPal      | Yes |
#| Spanish Fork, UT Will Call | ACH         | No  |
#| Lehi, UT Will Call         | ACH         | Yes |






