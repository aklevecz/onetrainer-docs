---
title: Dataset and Model Tools
description: Overview of tools available in OneTrainer for dataset preparation, mask generation, and model conversion.
---

## Dataset Tools

A tool that help to generate captions with BLIP, BLIP2 or WD14 and mask for masked training using ClipSeg or Rembg. For caption generation, if you set an initial caption, it starts generating from that text instead of an empty string (BLIP and BLIP2 only).

###  Caption Generation
If you set an initial caption, it starts generating from that text instead of an empty string (BLIP and BLIP2 only). You also can use in addition caption prefix and postfix, usefull with WD14, remember it doesn't add spaces, so you need to them or "," or ".".

###  Mask Generation
There are a few different tools to automatically generate a mask, depending on your image type, included in OneTrainer under the dataset tools button.
With the batch generate mask tool, you can use ClipSeg, Rembg, Rembg-human and Hex Color.

With ClipSeg, you can use prompts such as "a woman" or "face of a woman" or "face and hair of a woman" to have the model create a mask outside of the areas you specify. 

With the manual paint features, you can mask an area off and then use the fill option to fill in the remainder instead of trying to use a brush.

_**Do not forget to press enter after you are done manually editing your mask! Changes will not be saved unless you press enter**_

### Convert Model Tools

Convert between different model formats.