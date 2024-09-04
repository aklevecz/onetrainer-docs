---
title: Embedding Training Guide
description: Learn how to train embeddings for your models using OneTrainer.
---
This tab appears only for training Embeddings.

<img width="824" alt="Capture d'écran 2024-04-19 120113" src="https://github.com/Nerogar/OneTrainer/assets/129741936/a57bed6f-b73e-493c-9e23-a9c756c19a54">

* Base embedding (default - blank): fill it only if you want to train more to an existing embedding, leave it empty for a new embedding.
* Token Count (default - 1): The number of tokens to use for your embedding. The size of a token changes per model. 2 can be ok for simple embeddings like a face, more tokens can help to learn more like body features and will be stronger in more complex prompts (6 to 10 for example).
* Initial embedding text (default - * ): The initial embedding text used when creating a new embedding, it helps the model to understand what you are training. You can keep it short like just '*' but the more precise it is, the faster the training will be, it can also increase the final quality of the embedding. Remember it must use less tokens that the token count or it will get truncated.
* Embedding Weight Data Type (default - float32): What the embedding will be loaded into memory as.  As embeddings are small, there is little reason to move to bfloat16, but it is an option.
* Placeholder (default - `<embedding>`): it must match the placeholder you are using in your images captions. If you keep the default value, your captions should use the same (photo of `<embedding>`) but you can use any placeholder you want like "TomCruise" with captions like "photo of TomCruise". It doesn't need to be a single word and can include spaces.
