---
title: Guide
description: WIP guide for using OneTrainer 
---

This page is a work in progress

# Foreward
This guide will try to help you understand the basics of the OneTrainer program.  How to setup your run using the GUI, in a semi logical method (also known as "what I do").

This guide does not cover
* Setting up a runpod or other remote install. As these services are not free, the expectation of support when trying to make things work on them is nothing anybody would like to deal with as a volunteer.
* How to utilize the CLI (command line interface). It is best (almost required) to use the GUI to make the settings for running OneTrainer with the CLI.

This area (diffusion models) is continuously updating and changing, so this guide may be old before it even hits the web.
This guide also assumes Nvidia hardware and Windows, WSL or Linux install, which is all that I have familiarity with.
AMD/Intel/Apple hardware can be a challenge to use and experience is still minimal to learn from, making this work without deep knowledge and the desire to tinker and tweak with settings may not be possible.

This guide is more of a checklist, with an attempt to try and give guidance as best as possible. If you have any specific questions, please drop in the Discord server. The server will never be able to answer everyone's questions, but there are knowledgeable people in it who may be able to help if around.

# The Models
OneTrainer currently works with the following models
* Stable Diffusion 1.5
* Stable Diffusion 2 and 2.1
* Stable Diffusion XL
* Würstchen 2
* Stable Cascade (Würstchen 3)
* Pixart Alpha

In my experience, most people focus their efforts on SD 1.5 and SDXL. People attempt to train SD2.x occasionally.  Stable Cascade is looked at by people with research interests as it has certain advantages for finetunes in this regard.

Derivative models should be able to be trained with settings from the base. For example, SDXL Lightning and Pony should be able to be trained using the SDXL configuration. This is not to say that a LoRA intended for Pony will work when trained from the base, but that the SDXL settings with the base model being Pony should be a working solution.

## Notes
* Stable Cascade currently has inherent challenges as a research only model.  This means distribution and generation is difficult. This may relegate it to custom ComfyUI work flows. Note, the standard StableSwarm package for SC differs from the original distribution.
* Pixart Alpha had high hopes at release, but the use of T5 makes this a unet only trainable model for consumer GPUs
* SD2.x uses v-prediction training, which had hopes but was not able to deliver. People still try to make something more out of this model, as the resource requirements are not huge.

# Training Types
There are currently 4, soon to be 5 training types done in OneTrainer

* Textual Inversion (shortened to just Embedding). The entire model is loaded (VRAM requirement), but the calculations are fast as the program tries to find the tokens that will make your training concept. Embeddings are small files, as they are just tokens.
* LoRA (Low Rank Adaption of Large Language Models). Parts or the entire model can be loaded (Variable VRAM Requirement), to create layers that will sit on top of your base diffusion model. LoRAs can train unet, text encoders or both.  As LoRAs sit on top of the diffusion model, it is almost impossible to not have LoRA to bleed over to other parts of the base model that were not intended.
* FineTune. Parts or the entire model can be loaded (Variable VRAM Requirement) and directly affected by training.  To prevent destroying the base model it is important to minimize the gradients updates as much as possible. This requires large batch or virtual batch sizes and therefore FineTunes require the best hardware available to do a meaningful finetune in a time that does not stretch to weeks or months.
* InPaint Training. Same as Finetune, but intended for an inpainting workflow. I do not have any experience with this, so I am unable to share much details.
* Work in Progress - UNDER DEVELOPMENT - Universal Embedding. A technique to embed special tokens. Under development and more details to follow.

## Summarzing the Trainings
* Embedding - Finding the tokens that solve the solution to your concept(s). Tiny files, fast calcs, but can be difficult to find the right solution depending on your concept.
* LoRA - Building a new model on top of an existing model. Usually the best option for distribution. Variable size, depending on network rank. LoRAs can be merged into checkpoints. 
* Finetuning - Tweaking or expanding an existing model directly. Usually a very slow process to do not destroy the existing model. Building the dataset for a versatile and powerful finetune can take a person a long time, but once built this dataset can then be used for training future models as the technology changes. What larger players can do with quantity and commercial hardware can be done with a better, high quality focused work.

# General OneTrainer Workflow
It can be good to think of setting up your run in the following order.

## Prepare your environment
1. Determine the model and training you want to do and load the template
2. Determine the model to use (base from huggingface or different checkpoint?)
3. Setup your work environment (folders)

## Prepare your training 
1. Setup your concept(s)
2. Setup your sample(s)
3. Setup your save and backup frequency, if desired
4. Setup your final model save location

## Decide your model and training specifics
1. Determine your model weights, based upon your VRAM budget and hardware support.
2. Determine your training data type, based upon your VRAM budget and hardware support.
3. Determine your training resolution, ideally based upon the model you are working with. (i.e. 1024 for SDXL, 512 for SD1.5)
4. Determine your batch size, based upon number of concepts and VRAM budget and hardware support
* Your batch should be evenly divisible by your images used in an epoch. This is not a hard requirement, but at the same time you do not know which images will be dropped if it does not. 
* You should have enough images in an aspect ratio bucket to fill a batch. If you do not, that bucket will never be trained. OneTrainer does not currently display this information, and the only feedback you will get on this is if the steps x batch does not equal your concept images.


### Notes
* GTX 1000 and older cards do not support BF16 weights or calcs.
* RTX 3000 and newer cards are needed to do TF32 calcs.  Note: Check TF32 vs FP32 performance.
* RTX 4000 and (assumed) newer cards support FP8. Older cards may benefit from the memory savings but not the speed increase.

### FP32 Model Weights - Approx.
* Stable Diffusion v1.5 (512px) - Unet: 3.44GB, TENC: .48GB, VAE: .32GB, Total: 4.27GB
* Stable Diffusion v2 (512px) - Unet: 3.46GB, TENC: 1.36GB, VAE: .32GB, Total: 5.21GB
* Stable Diffusion v2 (768px) - Unet: 3.46GB, TENC: 1.36GB, VAE: .32GB, Total: 5.24GB
* Stable Diffusion XL (1024px) - Unet: 10.3GB, TENC1: .48GB, TENC2: 2.78GB, VAE: .32GB, Total: 13.88GB. Note: SDXL is almost always distributed in 6.94GB fp16 model weights. Even Huggingface only has fp16 combined safetensors.
* Stable Cascade (1024px, Stage C - 3.6 billion parameter) - Stage C: 14.4GB, TENC: 1.39GB, Total: 15.69GB
* Stable Cascade (1024px, Stage C - 1 billion parameter, denoted as 'lite') - Stage C: 4.2GB, TENC: 1.39GB, Total: 5.59GB
* Note, Stable Cascade TENC appears to be in BF16 weight already.
* fp16 or bf16 will cut the weights needed in VRAM by half. fp8 will cut the file size to one quarter original.

## Decide your optimizer and training specifics
1. Choose your optimizer, based upon your training type and VRAM budget
2. Choose your learning scheduler, based upon your optimizer and training type
3. LoRA - Go to the LoRA tab and determine your network rank, alpha and dropout
4. Embedding - Go to the Embedding tab and determine your token(s)
5. Finetune - No special tab or setting is required.

## Check your optimizer settings
1. Click the ... next to your optimizer and check the settings enabled or entered, keep in mind that the last settings used for each optimizer will come by default.
2. Check [here](https://github.com/Nerogar/OneTrainer/wiki/Optimizers) for more info on these settings.

## Decide your learning rate(s), Epochs, Warmup
1. Enter your main learning rate for the training, based upon your training type and optimizer
2. Choose the number of epochs, based upon your optimizer, training type and scheduler
3. Decide on the number of warmup steps, based upon your optimizer and training type
4. Decide if you want to train the Text Encoder(s), how long for, and the learning rate(s)
5. Decide if you want to train the Unet (or prior for SC), how long for, and the learning rate for it.

