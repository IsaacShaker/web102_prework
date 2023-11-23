# WEB102 Prework - *Sea Monster*

Submitted by: **Isaac Shaker**

**Sea Monster** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **3.5** hours spent in total

## Required Features

The following **required** functionality is completed:

* [X] The introduction section explains the background of the company and how many games remain unfunded.
* [X] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [X] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [X] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [X] The Our Games section has a search bar to filter games!
* [X] Buttons have a scaling hover effect for better user experience.


## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='assets/WEB-102-Walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with LiceCap
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

I had fun developing this website. The only issue I ran into was using a "for in" loop to iterate over the games in the `addGamesToPage` funciton. I swithced to a regular for loop that iterates by length of the games array and the bug was solved.

## License

    Copyright 2023 Isaac Shaker

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
