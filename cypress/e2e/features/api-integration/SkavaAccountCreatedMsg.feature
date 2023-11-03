Feature: Directory Service
    In order to manage directory
    As a developer
    I want to make sure CRUD operations through REST API works fine

    Scenario Outline: create a contact
        Given I create the resource with the endpoint "<endpoint>" and the request method "<request>"
        When I send the body "<body>"
        Then I get response code "<code>"

        Examples:
            | endpoint                                 | request | code | body                |
            | api/messages/SkavaUs.SkavaAccountCreated | POST    | 200  | SkavaAccountCreated |

