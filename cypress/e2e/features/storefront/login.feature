Feature: Sign In
  As a customer,
  I want to login with email and password,
  So that I can use the app.

  Background:
    Given I am at the Login page

  Scenario Outline: Loggin with valid credentials
    When I fill out the account email field with the value "<user>"
    And I fill out the password field with the value "<password>"
    And I hit the login button
    Then I should be at the home page
    And I logout

    Examples:
      | user | password  | email                       |
      | 1040 | Password1 | ziaessoilsadmqa@yopmail.com |
      | 5010 | Password1 | yl@ylfamily.com             |


  Scenario: Loggin with invalid credentials
    When I fill out the account email field with the value "5010"
    And I fill out the password field with the value "Password"
    And I hit the login button
    Then the error message "Incorrect username or password" is displayed
