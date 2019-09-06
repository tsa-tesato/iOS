//
//  document.js
//  DuckDuckGo
//
//  Copyright © 2017 DuckDuckGo. All rights reserved.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

(function() {

    document.documentElement.style.webkitTouchCallout = 'none';

    var startEvent = null
    var longPressTimer = null

    document.addEventListener('touchstart', function(event) {

        if (!["A", "IMG"].includes(event.touches[0].target.tagName)) {
            return false;
        }

        startEvent = event
        longPressTimer = setTimeout(function() { 

            const touch = startEvent.touches[0];
            const type = touch.target.tagName;

            var resource = "";
            if (type == "A") {
                resource = touch.target.href;
            } else if (type == "IMG") {
                resource = touch.target.src;
            }

            webkit.messageHandlers.longPress.postMessage({ 
                "webkitevent": "long press!", 
                "resource": resource, 
                "type": type,
                "x": touch.clientX,
                "y": touch.clientY
            });

            clearLongPressTimer();
        }, 1000);
        return true;
    });

    document.addEventListener('touchmove', function(event) {
        startEvent = null;   
        return true;
    });

    document.addEventListener('touchend', function(event) {
        if (longPressTimer && startEvent && startEvent.targetTouches[0].target == event.changedTouches[0].target) {        
            event.changedTouches[0].target.click();
        }

        event.preventDefault();
        event.stopPropagation();
        startEvent = null;
        clearLongPressTimer()
        return true;
    });

    function clearLongPressTimer() {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }

}) ()