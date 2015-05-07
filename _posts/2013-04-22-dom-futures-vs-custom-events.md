---
layout: post
title: "DOM Futures vs Custom Events"
description: "What the what?"
category:
tags: [javascript, dom futures, events]
---
{% include JB/setup %}

Maybe I just don’t get it yet, but it seems like the interest around “DOM
Futures” (e.g. promises) is growing, and is becoming a proposed spec for
future javascript engines. What DOM Futures is is another way to handle
asynchronous flow in your javascript apps. Currently you can use nested
callbacks, which are probably the most common, or you can use custom events
(like Backbone, jQuery, or any other publish/subscribe framework).

While I see that DOM Futures / Promises could cut down on lines of code, I’m
not sure what else it truly gives me as a developer. But, I may not fully grok
it yet.

I’ve put together two examples of a ficticious javascript app that needs to
get a user’s posts via ajax. Below you’ll see each example via DOM Futures and
via custom events.

What am I missing?

## DOM Futures

From the WHATWG spec. This example makes a JSON ajax request, and then returns
a promise object that has the “.done()” method on it, that will asynchronously
call one of two callbacks depending on the response of the json call.

    fetchJSON("/user/posts").done(showPosts, showFailcat)

    function fetchJSON(url){
        // create json request, wrap in a promiseObject
        return promiseObject;
    }

    function postsSuccess(data){
    }

    function showPosts(data) {
        postsSuccess(data);
        //...
    }

    function showFailcat(error){
        //...
    }

## Custom Events

A similar example using some custom event framework, that attaches/subscribes
using “on()” and triggers/publishes to an event using “trigger()”.

    $.getJSON("/usr/posts",onPostsSuccess,onPostsError)

    function onPostsSuccess(data){
        // let's just say we have two events we want fired
        trigger("posts:success",data);
        trigger("posts:show",data);
    }

    function onPostsError(error) { trigger("posts:error",error); }

    function postsSuccess(posts){
    }

    function postsShow(posts){
    }

    on("posts:success",postsSuccss);
    on("posts:success",postsShow);

    function postsError(error){
    }
    on("posts:error",postsError);
