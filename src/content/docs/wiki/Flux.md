---
title: Flux Model Overview
description: Learn about the Flux model, its details, limitations, and current information for training with OneTrainer.
---

This page is a work in progress as information is learned about Flux. 

Flux is a DiT Transformer flowmatching model that has high learning potential but it is a very large and also slow model to work with.

### Model Details:
Like SD3, a hugginfgace key or a local copy of the diffusers model is needed.

### Limitations:
* Finetune is not currently possible.
* Embeddings do not likely work, due to the nature of T5.
* Single file safetensors is currently not supported as a model import.

### Current Information:
* Lora is currently the only recommended training.
* NF4 is possible with the model weights. INT8 requires bits and bytes fixes and is not supported.
* The OneTrianer Lora can be used in Comfy in the standard Lora Loader.
* Flux can learn at lower resolutions, for example 512 and 768, which is a benefit for people with less powerful graphics cards.
* It is possible to train a Flux Lora on 12GB.  8GB cards are likely too close to the limit, and would require windows to be using a different GPU for VRAM usage as Windows can quite a bit of VRAM.
