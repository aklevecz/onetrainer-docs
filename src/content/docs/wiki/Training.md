---
title: Training Configuration Guide
description: Detailed guide on configuring training parameters in OneTrainer.
---
### Sections
Note a tooltip is available for each parameter.

<img width="1272" alt="training" src="https://github.com/Nerogar/OneTrainer/assets/129741936/972e8598-38f5-4eb4-b6e4-ffac0cfd03ae">

## Optimizer Info
Additional info can be found for optimizers [here](https://github.com/Nerogar/OneTrainer/wiki/Optimizers)

## Train Text Encoder (1 and 2) 
The text encoder LR overrides the base LR if set.

SDXL Includes 2 text encoders (TENC1 - CLIP-ViT/L and TENC2 - OpenCLIP-ViT/G). It has been suggested that TENC1 works better with tags and TENC2 works better with natural language, but this is not proven and based more upon testing observation and feeling. Trying to determine the best way to make the text encoders act in concert to get the result you want is one of the biggest challenges with SDXL finetuning. Most success stories have had access to commercial grade hardware, and not consumer grade. [For reference, here is the hardware information for the original CLIP models.](https://github.com/Nerogar/OneTrainer/assets/132208482/8e5ecdc2-fc63-47ab-9c74-691902fe681b).


## Train UNet 
The unet encoder LR overrides the base LR if set.

[Text and Unet encoders](https://rentry.org/59xed3#text-encoder-learning-rate)

## Masked Training 
With masked training, you can instruct the model to focus on some parts of your training images. For example, if you want to train a subject, but less the background, this setting will help. To enable masked training, you need to add a mask for every training image. This mask is a black and white image file, where white regions define what should get the focus, and black regions less. The files need the same name as the images, with an added "-masklabel.png" extension. Masks must be in the png format. These masks can be created in the tools section, both automatically or using a painting function. When doing masked training, OneTrainer will see nothing where the mask is.  

Note: have also a look at this [discussion](https://github.com/Nerogar/OneTrainer/discussions/347#discussioncomment-9807611) for masked training.

The options available for mask training are:  
_Unmasked probability_: the number of steps that will be run without the mask. Should be thought of as a percentage. Value: 0 to 1. Default: .1

_Unmasked Weight_: The weighted loss value during unmasked training of the area where the mask is. Should be thought of as a percentage. Value: 0 to 1. Default: .1

_Normalize Masked Area Loss_: a toggle (on/off), should be used when the masked area is very large (example: jewelry). For smaller size masks, this will increase the smooth loss, which is likely unwanted. For example, runs with this on have made the smooth loss go from .06 to .12 with masks that are less than 50% of the image.

## Main settings
The most important settings are the Learning Rate, Scheduler Optimizer.
Then come the epochs, batch size and accumulation steps.

Finaly the training resolution set by defaut depending on the based model. You can train multiple resolutions at the same time by specifying a comma separated list of numbers in the resolution field. Each step will train on a randomly selected resolution from the list. It has been noticed that multi resolution training can greatly improve the model quality.

Ex of multi resolution values (idea is to step up and down by 64px):
* SD1.5: 384,448,512,576,640 
* SDXL: 896,960,1024,1088,1152 

See also [Multi Resolution Training](https://github.com/Nerogar/OneTrainer/wiki/Lessons-Learnt-and-Tutorials#multi-resolution-training) for more information and optionaly use [resolution override](https://github.com/Nerogar/OneTrainer/wiki/Concepts#image-augmentation-tab) on the concepts.

### Gradient Checkpointing 
Reduce the memory usage but increase the training time.

### Optimizer
This section is in work in progress, you can make any suggestions to improve it in the [Discord discussion](https://discord.com/channels/1102003518203756564/1144311654385983538).
An optimizer will slightly adapt the learning rate at runtime. They come with their default settings, by clicking on the 3 dots on the right you can adjust them.
* ADAMW: One of the most used.
* PRODIGY: A special one that determines itself the appropriate LR. When using it set a Learning Rate to 1 everywhere and use either Cosine or Constant scheduler.

Use a small batch size with it (around 4), works good with large dataset (>30 pics or even more).

Note also that the samples will change after 40-80 epochs, not before, so stay patient.
* ADAFACTOR: paper: [Adaptive Learning Rates with Sublinear Memory Cost](https://arxiv.org/abs/1804.04235). This optimizer internally adjusts the learning rate depending on the scale_parameter, relative_step and warmup_init options
With a constant scheduler, LR 1e-4, 1e-5, 3e-05... tested with batch 1 to 5, raising the accumulation steps didn't influence much.

### Learning Rate Scheduler
The scheduler method will caluculate the learning progression based on the initial learning rate value (set in the Learning Rate field).

Note: their are several learning rate fields in addition to the base learning rate (simply called Learning Rate). These are for the text encoder(s), Unet and embeddings (for additional embeddings),if they are empty they will use the base LR, if set they will overwrite the base LR value.

* Constant: fixed learning rate.
* Linear: linear learning rate decay from the initial learning rate to 0.
<img width="227" alt="linear" src="https://github.com/Nerogar/OneTrainer/assets/129741936/95237662-3f87-4383-b7f7-850a4da54e76">

* Cosine

This scheduler decay very fast, better to use with large dataset and small batch or increase the epochs.

<img width="233" alt="cosine" src="https://github.com/Nerogar/OneTrainer/assets/129741936/1dbcd622-5964-4421-b9e8-4270554d8ed6">

* Cosine with restarts

* Cosine with hard restarts

* REX: reverse exponential learning rate decay starting from the initial learning rate and ending at 0. Don't set any learning rate warmup step when using it.

<img width="233" alt="REX" src="https://github.com/Nerogar/OneTrainer/assets/129741936/6c6d1ed9-4983-4dd4-aaea-44ae64a279ff">

[Rex usage sample](https://github.com/Nerogar/OneTrainer/wiki/Lessons-Learnt-and-Tutorials#rex-scheduler-usage-by-hypopo) This sample give some tips to use REX for fast training but you can use this sceduler like any other decaying scheduler (linear or cosine).

Custom Schedule Information can be found here: https://github.com/Nerogar/OneTrainer/wiki/Custom-Scheduler

### Train Data Type
Internally, this sets the mixed precision data type when doing the forward pass through the model. This setting trades precision for speed during training. Not all data types are supported on all GPUs. In practice, float16 only slightly reduces the quality, while providing a significant speed boost. But for best quality use float32 (reduce speed).

### Epochs / batch / accumulation steps

* Epochs: an epoch is a cycle where all your images are trained. Depending on the batch size and dataset it can use one or more iterations.
* Batch size: number of images sent to the GPU for processing.
* Accumulation steps: multiplier of the batch size. Ex: if you want a batch of 16 but are limited to batch 4, set the accumulation step to 4.

### EMA (Exponential Moving Average)
A moving average is a statistical tool to determine the direction of a trend. Exponential Moving Average is a type of Moving Average, which applies more weight to the most recent data points than those which happened in past.

Only useful for bigger datasets with multiple concepts as EMA will reduce diversity, more EMA is less diversity.
If your dataset isn't too complex with wide variation, then leave it OFF. If you can't get good results with EMA OFF then try to enable it. For datasets of hundreds or thousands of images, set EMA Decay to 0.9999. For smaller datasets, set it to 0.999 or even 0.998.



## Footer
Display the progression of the training, epochs and steps used by epoch.
