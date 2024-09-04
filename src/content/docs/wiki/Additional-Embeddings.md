---
title: Additional Embeddings
description: The ability to add additional embeddings to your training. This helps embed your concept without stepping on the models encoders.
---
WIP - As this is a new feature, information will be added as it is found.

This tab allows you to add additional embeddings to your training.

![image](https://github.com/Nerogar/OneTrainer/assets/132208482/77a68b43-6418-42ec-916f-9d31bc2c0a36)
# Description
A technique for adding text embeddings into ANY training. This is not limited to LoRA training and can be used with FineTunes or even just to train multiple embeddings without training any Unet or Text Encoders. 

One use case for this type of training is to combine training of a LoRA unet with a text embedding. This allows you to embed a concept, style or person into a checkpoint while barely touching the text encoders while using the unet trained with the LoRA to provide graphical information for the embedding.

The additional embeddings tab will always be available, no matter what type of training you are doing. This is how you can combine additional embeddings with LoRA training or a FineTune.

# Usage
Currently, when an additional embedding is made, a subfolder is created that will have the embedding inside it. This subfolder will be in the location where your finished safetensor file is stored. This also applies for incremental saves during training, subfolders will be created for each incremental save with the embedding inside it. 

For a LoRA you have a new option (activated by default) to bundle the embeddings into the LoRA so the subfolder won't be created. Note that bundled embeddings are only supported by A1111 for now. For other solutions, deactivate this option.

To use with generation, you need to include the LoRA and the embedding, or the finetune and the embedding, into your generation program of choice to get the combined results. 

# Additional Embeddings GUI Setup
## Add embedding
* Pressing this button will add a default embedding to the tab.

## Additional embedding settings
* Red X - Pressing this button will delete this additional embedding
* Green plus - Pressing this button will duplicate your additional embedding
* base embedding (default:blank) - Use this field to specify if you want to load an existing embedding for further training
* placeholder (default:`<embedding>`) - the placeholder for your embedding. It will be used as the filename (generated in a separated folder next to the model defined in the model tab) and must match the trigger word you use in your captions. This will also be the placeholder you use in your prompt, for example in Automatic1111. Note it doesn't need to be a single word, several words separated by space will work as well.
* token count (default:1) - the number of tokens you want to use for your embedding
* train (default:on) - a toggle that specifies if your next training run will train this additional embedding
* stop training after (default:blank - NEVER) - Two fields that you can use to tell OneTrainer how long you want to train this embedding for. Specifying NEVER will allow the training run the entire length.
* initial embedding text (default: * ) - The word or words or phrase that your embedding will point to initially, before any training takes place. If you put too many tokens here it will be truncated to the token count, and if you specify too few it will be padded with *.

# Notes
* Use a tool like automatic1111 or stable swarm to determine how many tokens your initial text is that you want to use. This can help set the number of tokens you want to use in the embedding. You can also use this [link](https://novelai.net/tokenizer) to determine token information. Please ensure you use the CLIP Tokenizer from the dropdown list.
* Using an additional embedding with LoRA training with both unet and text encoders will result in very fast learning in the case of subject training
* As additional embeddings are currently separate files, trying to train a very large number of embeddings is not easy to manage or create.
* There are likely many more ideas of what can be done with this technique. Try them out and share them on the Discord!
* Using your caption trigger word as the placeholder for the embedding will make things much easier. You no longer have to use `<embedding>` and have separate captions for embedding runs and LoRA/FineTune/Additional Embedding runs.
* Prodigy struggles if you only train the unet and an additional embedding (and do not train the Text Encoder(s)). Limiting the growth to 2, and using BF16 weights and calcs has been shown to work, at least in SDXL. If you try Prodigy with FP16 and get it to work, please share your settings.
* On the training tab under the embeddings learning rate there is an option "Preserve Embedding Norm", it's for rescaling the trained embeddings to the average norm of all other embeddings (between 0.35 and 0.45).
* LR may need to be adapted to each encoder but there won't be any recommendation here as it depends so much on what you're training.

# More Info 
Pivotal tuning is a similar concept, and here is some additional information to understand more.
* https://github.com/danielroich/PTI
* https://huggingface.co/blog/sdxl_lora_advanced_script