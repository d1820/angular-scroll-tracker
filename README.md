# Angular Scroll Tracker

Here is a directive I came up with to help with keeping track of page scroll position and when 
scrolling has started and stopped. I had a need for this in trying to hide page content while 
the user was scrolling up/down a page, and then re-showing the content once the scrolling had stopped. 
Currently this is only setup up to work at the document level, but and easy modification could be made 
to allow a new property to drive what scroll area is being monitored. I hope this helps others in case 
they need a way to tell if page scrolling has started or stopped.

<h2>How to Implement</h2>


<strong>HTML</strong>

Simply add the directive to the page or element you want to monitor scrolling on. 
Next add the scroll-callback function you want to be called from directive when scrolling starts and stops
Next set the scroll-page to true for tracking document scrollbar, else can leave out for element scroll tracking

<pre>

&lt;div scroll-watcher scroll-callback="cntl.scrollStop($event, isEndEvent, isScrollingEvent)" scroll-page"true" &gt;

</pre>


<strong>Callback Function</strong>

Note: sample code is in ES6 format. This is an excerpt from a angular controller

<pre>

 //$event is the standard scroll event from the browser. This contains the X,Y information

 //isEndEvent signals when scrolling has stopped

 //isScrollingEvent signals when scrolling has started

 scrollStop($event, isEndEvent, isScrollingEvent) {

    if (isEndEvent) {

      this.showBottomBar = true;

      return;

    }

    if(isScrollingEvent)

    {

      this.showBottomBar = false;

      return;

    }

  }

</pre>

