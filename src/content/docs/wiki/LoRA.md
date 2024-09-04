---
title: LoRA Options Tab
description: Options related to LoRA training
---
# LoRA Options Tab
This tab is only visible if you are making a LoRA

There are a few options on this tab.

![image](https://github.com/user-attachments/assets/ddbf1f6d-bc41-48dd-918f-4c633e6f6fdf)

* Type (default: LoRA): Which form of parameter-efficient fine tuning you want to use. Your options are LoRA (conventional) and LoHa (introduced by the Lycoris project).
* LoRA base model (default: Blank): This allows you to load a LoRA to continue working in it. Alternatively, a backup folder can be used, but be warned that when loading a backup folder you are more limited in what can be done.
* LoRA rank (default: 16): This is the value that determines the number of layers your LoRA will have.  The more layers, the more VRAM you will need but the more data that can be stored.
* LoRA alpha (default: 1.0): A tunable hyperparamater.  The alpha value divided by the rank will be multiplied by your learning rate. For example the defaults will provide a .0625 multiplier (1/16) to your learning rate.  Adaptive optimizers (dAdapt, Prodigy) will, as the name suggests, adapt to your alpha value.
* Decompose Weights (default: off): Only valid with LoRA. Perform magnitude/direction weight decomposition. This is often known as **DoRA** and can result in much better learning and faster convergence than traditional techniques. If you do select this option, you must vastly reduce your dropout probability to as much as 1/10th what you would set for regular LoRA.
* Dropout probability (default - 0.0): A technique to help with overfitting by randomly ignoring a percentage of the training nodes at each training step. One guide (the one linked below) recommends values between .1 and .5.  Check that guide if you want to learn more.
* LoRA weight data type (default: float32): What precision is used when loading the LoRA into memory.
* Bundle Embeddings (default: on): If you train additional embeddings, this will bundle them into the LoRA file. This option is only supported in Automatic1111 and SD.Next; ComfyUI does not read these.
* Layer Preset: Selects which model layers to train. You can choose "custom" and specify your own, comma separated. But we recommend sticking with either attention only or attention+MLP.

## Lora Alpha Values
Lora Alpha values and Ranks have created many conversations on the Discord, and the Discord is a good place to get more info and also search for info not in the wiki!

## More Information on LoRAs
[If you are interested in reading more about LoRA, here is a link you can follow to a guide on CivitAI.](https://civitai.com/articles/3105/essential-to-advanced-guide-to-training-a-lora)