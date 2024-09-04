---
title: Model Summary
description: WIP page for the models supported by OneTrainer
---
This page is a WIP. Models are added regularly and it is difficult to keep information up to date.

# Summary of OneTrainer Models
This page is a summary of the current architectures that can be trained using OneTrainer, including basic information in how to set them up. All sizes are given in native diffusor values, which tends to be fp32 (full precision), exceptions will be noted.

## SAI Models (Stability AI)
SAI models have been the basic architecture used for some time, as they have consistently published all information necessary to perform training on their models. (Up to SD3, which is still very much a work in progress)

### SD1.5
* Stable Diffusion 1.5 is a 512px architecture (512x512), using 1 text encoder and 1 unet.
* Hugging face link: `runwayml/stable-diffusion-v1-5`
* Safetensor checkpoints supported for training: Yes
* Trainings Supported: finetune, embedding, LoRA, inpainting, masked, inpainting masked, additional embedding
* Unet: 3.44GB, 849 Million parameters
* Text Encoder: CLIP ViT-L/14, 492 MB, 123 Million parameters
* VAE: 335 MB, 83 Million parameters



