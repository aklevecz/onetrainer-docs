---
title: Model Configuration Guide
description: Instructions for configuring base and output models in OneTrainer.
---

# Model Configuration Guide

Here you define the base model you use for training and the output model you want to achieve.
![model](https://github.com/Nerogar/OneTrainer/assets/132208482/ea3f29ea-e576-4d09-9c9a-ffe1ac320fb5)

- **Base Model (default: hugging face link to base)**: either provide the path of a saved base model or provide a link to it in the huggingface format (example: stabilityai/stable-diffusion-xl-base-1.0).
- **Vae (default: blank)**: If you want to use a custom VAE, it must be a huggingface link (example: madebyollin/sdxl-vae-fp16-fix).
- **Model Output destination**: set any local folder with its name and type (e.g., `C:/OneTrainer/Output/xxx.safetensors`). Note - models that produce diffusor outputs expect a directory, not a safetensor file. This currently includes Pixart Alpha.
- **Output Format (default: safetensors)**: Here you can choose between the default safetensors and the optional checkpoint format.
- **Data Type**: 4 options are available. From the least to most precise they are: float8, bfloat16, float16, and float32. The more precision you use, the more VRAM you will require to load the weights.

## Recommended Values for DType Usage (To be checked, work in progress)

| DType for                | Fine Tune       | LoRA            | Embedding       | Fine Tune VAE   | Comment |
|--------------------------|-----------------|-----------------|-----------------|-----------------|---------|
| Output                   | All             | All             | All             | All             | Comment |
| Weight                   | All             | All             | All             | All             | Comment |
| Override Text Encoder    | float32         | All             | Not relevant    | Not relevant    | Comment |
| Override Unet            | All             | All             | Not relevant    | Not relevant    | Comment |
| Override VAE             | float32, bfloat16 | float32, bfloat16 | float32, bfloat16 | float32, bfloat16 | Comment |

If all samples are black, try to set the VAE data type to float32 or bfloat16, or use the VAE override to load the fixed VAE.

Note: The presets (top left dropdown: `#SD1.5 LoRA`, `#SD1.5 Embedding`, ...) will set up default values, you can stick to them, they are working.