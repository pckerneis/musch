# API Reference
## Functions

<dl>
<dt><a href="#initApi">initApi(midiOutput, textOutputLines)</a></dt>
<dd><p>Initialise API context</p>
</dd>
<dt><a href="#fire">fire(action)</a></dt>
<dd><p>Schedule the function <code>action</code> to be called at the cursor position.</p>
</dd>
<dt><a href="#repeat">repeat(action, interval, count)</a></dt>
<dd><p>Repeatedly calls the function <code>fn</code> every <code>interval</code> seconds for <code>count</code> times, starting at the cursor position.</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>Clears the logs.</p>
</dd>
<dt><a href="#fclear">fclear()</a></dt>
<dd><p>Schedule a log clear at the cursor position.</p>
</dd>
<dt><a href="#log">log(...messages)</a></dt>
<dd><p>Log a message.</p>
</dd>
<dt><a href="#flog">flog(...messages)</a></dt>
<dd><p>Schedule a message to be logged at the cursor position.</p>
</dd>
<dt><a href="#at">at(time)</a></dt>
<dd><p>Move the cursor at position <code>time</code> expressed in seconds.</p>
</dd>
<dt><a href="#wait">wait(duration)</a></dt>
<dd><p>Offset the cursor by <code>duration</code> expressed in seconds.</p>
</dd>
<dt><a href="#cursor">cursor()</a> ⇒</dt>
<dd></dd>
<dt><a href="#note">note(pitch, velocity, duration, channel)</a></dt>
<dd><p>Schedule a MIDI note to be played at the cursor position
with note number <code>pitch</code>, velocity <code>velocity</code> and duration <code>duration</code> on midi channel <code>channel</code>.</p>
</dd>
<dt><a href="#program">program(program, channel)</a></dt>
<dd><p>Sends a MIDI program change message.</p>
</dd>
<dt><a href="#channel">channel([channelNumber])</a></dt>
<dd><p>Set the default value for next MIDI messages</p>
</dd>
<dt><a href="#pick">pick(numberOrArray)</a> ⇒ <code>string</code> | <code>number</code></dt>
<dd><p>Pick an element among choices.</p>
<ul>
<li>If an array is provided, the output will be an element of the array</li>
<li>If an string is provided, the output will be a character of the string</li>
<li>If a number is provided, the output will be a number between 0 and this number</li>
<li>For other inputs, the output is a random value between 0 and 1</li>
</ul>
</dd>
<dt><a href="#getApi">getApi()</a> ⇒</dt>
<dd></dd>
</dl>

<a name="initApi"></a>

## initApi(midiOutput, textOutputLines)
Initialise API context

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| midiOutput | <code>object</code> | MIDI output used |
| textOutputLines | <code>Array</code> | Array of messages to log |

<a name="fire"></a>

## fire(action)
Schedule the function `action` to be called at the cursor position.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>function</code> | The action to schedule as a function |

<a name="repeat"></a>

## repeat(action, interval, count)
Repeatedly calls the function `fn` every `interval` seconds for `count` times, starting at the cursor position.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>function</code> | The action to repeat |
| interval | <code>number</code> | The repeat interval |
| count | <code>number</code> | How many times to repeat |

<a name="clear"></a>

## clear()
Clears the logs.

**Kind**: global function  
<a name="fclear"></a>

## fclear()
Schedule a log clear at the cursor position.

**Kind**: global function  
<a name="log"></a>

## log(...messages)
Log a message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>\*</code> | Messages to log |

<a name="flog"></a>

## flog(...messages)
Schedule a message to be logged at the cursor position.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>\*</code> | Messages to log |

<a name="at"></a>

## at(time)
Move the cursor at position `time` expressed in seconds.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | Time position in seconds |

<a name="wait"></a>

## wait(duration)
Offset the cursor by `duration` expressed in seconds.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | Duration in seconds |

<a name="cursor"></a>

## cursor() ⇒
**Kind**: global function  
**Returns**: the cursor position.  
<a name="note"></a>

## note(pitch, velocity, duration, channel)
Schedule a MIDI note to be played at the cursor position

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pitch | <code>number</code> | MIDI note number |
| velocity | <code>number</code> | Velocity value |
| duration | <code>number</code> | Note duration |
| channel | <code>number</code> | MIDI channel to send to |

<a name="program"></a>

## program(program, channel)
Sends a MIDI program change message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| program | <code>number</code> | MIDI program number |
| channel | <code>number</code> | MIDI channel to send to |

<a name="channel"></a>

## channel([channelNumber])
Set the default value for next MIDI messages

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [channelNumber] | <code>number</code> | Default MIDI channel |

<a name="pick"></a>

## pick(numberOrArray) ⇒ <code>string</code> \| <code>number</code>
Pick an element among choices.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>number</code> - - a randomly picked element  

| Param | Type | Description |
| --- | --- | --- |
| numberOrArray | <code>number</code> \| <code>string</code> \| <code>Array</code> | choices to pick from as a number, an array or a string |

<a name="getApi"></a>

## getApi() ⇒
**Kind**: global function  
**Returns**: the public API  
<style>dl { display: none; }</style>