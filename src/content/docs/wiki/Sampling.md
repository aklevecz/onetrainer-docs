---
title: Sampling Configuration Guide
description: Instructions on configuring and managing sample generation during training with OneTrainer.
---

# The Sampling Tab
The sampling tab is where you can control what samples you want to create and when.
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/3056963c-3a00-4b95-97b7-feb496083033)

On the main tab you can do the following:

## Top Items
* Sample after X Y. In this, x is an integer and y can be any of the following Epoch/Step/Second/Minute/Hour/Never/Always. Note that Never and Always are special and ignore the integer input.
* Choose the Picture format. The default is JPG. Also available is PNG
* Sample now. When you press this button, OneTrainer will sample at the next available opportunity
* Manual sample. Pressing this button will open the manual sample window, see more info below.
* Non-EMA sampling. Enabling this toggle will allow generation of EMA and non-EMA sampling when EMA is used.
* Samples to Tensorboard. Enabling this toggle will allow samples to be loaded as part of your Tensorboard run data.

## Sample Management
* The dropdown menu will show your sample configurations that have been created
* The add config button will allow you to create a new sample configuration file
* The add sample button will create a new sample in the space below
* Note: One way to easily duplicate sample from one config to another is to go to your training_samples folder and find the .json file you want to copy. Make a copy of it and rename it to the config name you would like. You can then load this new config in OneTrainer and modify it. Or it can be modified in your text editor of choice.

## Sample Prompt(s)
* In this area, the sample prompt(s) will appear and you can do some high level modification of them here.
* To see all options, you must press the ... button to the right of the sample.
* You can use the buttons in front of the sample to easily delete or duplicate the sample.
* The toggle in the front of a sample controls if the sample is enabled or not. Note: It is not possible to edit using the ... button samples that are not enabled.

## Sample Prompt Config Window
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/44558955-2003-46c1-86f2-bb6c9630b146)

In this window you see after pressing the ... button, you can make changes to all of the items related to a sample prompt. This includes:
* Prompt - You can edit the main prompt.
* Negative Prompt - You can edit the negative prompt for the sample.
* width and height - You can edit the width and height for the prompt. Note: These values must be valid for the model you are working with. Default is 512x512.
* seed - You can enter the seed you want to use. The default value is 42, because after all it is the answer.
* random seed - Enabling this toggle with override your seed and use a random seed instead.
* cfg scale - The configuration scale to be used for your prompt, default is 7.0
* Sampler - The sampler you want to use for your sample prompt. Default is DDIM. Options include Euler/Euler A/UniPC/Euler Karras/DPM++ Karras/DPM++ SDE Karras
* Steps - The number of steps you want to use for a sample. Default is 20.

## Manual Sample Window
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/f951a76a-7c07-45c6-b862-9a92bce6932e)
This window that opens when you press manual sample will allow you to generate a custom manual sample when you want. This is great for FineTunes and other long training runs with multiple concepts.
The settings for this are the same as the Sample Prompt Config Window, but are for one time use. Pressing sample will cause OneTrainer to sample when possible.


## Notes and Comments
* This tab can be updated during training and will update your samples and frequency when you make changes. This can lead to unattended consequences if you start to setup your next runs samples, and your current training starts a sample generation run.
* Samples for embeddings must use the `<embedding>` placeholder to function.
* Samples are put into the sample folder of your workspace directory when created.
* Samples are put into subfolders, based upon the sample order (0,1,2) followed by first part of your prompt.  Note: Changing the beginning of your prompt will change the folder samples will go into after that step.
* Manual samples go into their own subfolder.
