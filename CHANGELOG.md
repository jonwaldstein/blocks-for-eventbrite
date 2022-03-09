# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1]
- Fix pageSize attribute by casting to number

## [1.1.0]
- Add button text field (#25)
- Add pageSize attribute / event number limit field (#26)

## [1.0.10]

-   Fix CSS classnames (#21)
-   Replaced "grey" with "gray" in classnames
-   added active text states
-   adjusted details link style to remove outline and make background transparent
-   added more css classnames to elements for users to customize elements

## [1.0.9]

-   Fix field labels and update readme

## [1.0.8]

-   Add date and time formatting options (#19)

## [1.0.7]

-   Remove organizations from localized data (#12)

## [1.0.6]

-   Add Internationalization (#9)

## [1.0.5] - 06-29-2020

### Changed

-   get organization id from /v3/users/me/organizations/ endpoint

## [1.0.4] - 06-22-2020

### Fixed

-   added back nameFilter after removing it by accident

## [1.0.3] - 06-22-2020

### Changed

-   events api request to use `/v3/organizations/id/events/` endpoint

## [1.0.2] - 05-17-2020

### Added

-   name_filter param to eventbrite settings to filter by event title keywords

## [1.0.1] - 05-06-2020

### Changed

-   fixed conditionally display venue details to prevent event from not displaying

## [1.0.0] - 04-04-2020

### Added

-   @wordpress/scripts and @wordpress/creat-block to scaffold plugin and webpack
-   custom webpack file to utilize postcss, & css modules
-   custom postcss.config file
-   custom .eslintrc file that extends wordpress for editor to use as formatter
-   Tailwindcss for the css
-   Axios for api key testing within gutenberg
-   CSS modules to keep css in scope
-   React to build the field editing & front-end components
-   Transients to cache the fetched data for 1 minute at a time or if attibributes have changed
