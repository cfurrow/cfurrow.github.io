---
layout: post
title: "Chrome broken when resetting your account password w/ 2-factor on."
description: ""
category:
tags: [google, chrome, two-factor, browser]
---
{% include JB/setup %}

Since this has happened twice in the last two-weeks, I thought I'd write it up.

## Scenario

Your company has a password-expiration policy, along with a mandatory two-factor
authentication policy for all Google App users. Great! That's secure, plus, I
use 1Password, so I never have to remember long, complicated passwords, and the
[Google Authenticator](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB4QFjAA&url=https%3A%2F%2Fitunes.apple.com%2Fus%2Fapp%2Fgoogle-authenticator%2Fid388497605%3Fmt%3D8&ei=cbO2VNvzOdH-yQSJ1YCgAg&usg=AFQjCNErUPztKxmJDKqKeQmLJa5xoTdRCw&sig2=k8j55FUVK7Fx7A-g8ZAjCQ&bvm=bv.83640239,d.aWw)
iOS app makes storing all my two-factor codes in one place a breeze!

## Problem

Google Chrome is a complete failure.

When the above scenario happens, and I have to change my password for my account,
I get a little warning in Google Chrome that I have to sign-in again to link
my browser to my Google Apps account, and sync history, bookmarks, etc. I attempt
to do so by entering in my email, plus my brand-spanking-new password, click the
button and... nothing. The sign-in dialog goes away, and I'm still not logged in.
I try again, then again, then again. I think, "Oh, maybe since I have two-factor
on, I need to use an app-specific password. No problem!" I try that, still nothing.

## Solution

Sign out of Google by going to your browser settings, and clicking "Disconnect
your Google Account".

<img src="/assets/photos/2015.01.14/disconnect-chrome.png" width="670" />

Then you have to sign back in once it closes your browser window, and start all
over. While the process does not take long, the mere fact that it exists as the
"solution" is very tiresome, having had to do it twice in as many weeks due to a
mixup in the "password reset" schedule.
