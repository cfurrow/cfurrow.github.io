---
layout: post
title: "How I removed friction in running my tests locally"
description: "Setting up a local continuous testing environment so I don't break production."
category: testing
tags: [testing, ci, git, deployment]
---


### Problem: Sometimes I forget to run tests before deploying to staging (oops)

Yes, “bad dev!” indeed. In the midst of quick-fire releases, sometimes my own
standards for due-dilegence falls through the cracks. The friction comes with
my having to remember to run all my tests before pushing code off my machine,
and to a shared environment (git repo, staging build server).

What I am good at remembering to do is to commit the smallest possible changes
to my local git feature branch. Because I makes mistakes, and the easier it is
to isolate those changes/mistakes, the easier it is to cherry-pick them away,
or create a fixing commit.

### Solution: Remove the friction and bring the continuous integration locally

Continuous Integration (CI) / Continuous Delivery (CD) are a must-have for
your company’s projects to take away the hassles of running tests, bundling
and deploying your code to their production or staging endpoints/servers.

Because of my commit small hunks, and commit often, I decided to install a CI
server locally that listened to all my local commits across all branches, and
then build the code, run all the unit tests and deploy the app locally for UI
testing.

Now, I can be sure that all my changes have not broken any existing test, and
I can keep plugging away while the server handles the rest.

On a multi-monitor setup my main display is for coding, and my secondary is
for watching the build server alerts and refreshing the locally-deployed site
in a browser.

I’ve found having this configuration and workflow actually helps enforce good
practice. Knowing that each commit fires a build keeps me doing it in small
amounts, and I get the added benefit of tests and deployments while I keep my
mind in the context of the problem.
