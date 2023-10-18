Feature: Directory Service
    In order to manage directory
    As a developer
    I want to make sure CRUD operations through REST API works fine

    Scenario Outline: create a contact
        Given A contact <request>
        When I send request "<request>"
        Then I get response code "<code>"

        Examples:
            | endpoint                                  | request | code |
            | api/messages/SkavaUs.SkavaAccountModified | POST    | 200  |



