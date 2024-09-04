---
title: Model Configuration Guide
description: Instructions for configuring base and output models in OneTrainer.
---
In this tab, you define the directories used by OneTrainer.
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/8e059014-6b15-48cd-98e2-81db535218ec)


* Workspace Directory (default - workspace/run): required, this directory will contain the samples generated during a training, the training settings, the backups and tensorboard logs. You can use a single folder or create a folder per project. The second option might be useful if you work on several projects/tries.
* Cache Directory (default - workspace-cache/run): required, used during runtime to store your cached images and text.
* Continue from last backup (default - off): when enabled it will use the last backup from the selected workspace.
* Debug Mode (default - off): switch to debug mode. This will provide you with data and images of what OneTrainer is doing including the images (predicted vs actual) of the training step
* Debug Directory (default - debug): optional, only required if you switch on the Debug mode.
* Tensorboard (default - on): Whether to start Tensorboard when training is started. Tensorboard is used to see statistics of your training runs.  All Tensorbaord runs in a current workspace will be available for viewing.
* Expose Tensorboard (default - off): This will move Tensorboard from the localhost to be exposed to the rest of the network.
* Train device (default - cuda): A free text field for choosing the GPU to train on. Multi-GPU training is not possible, but it is possible to choose which GPU to use (example: cuda:1)
* Temp device (default - cpu): A free text field for choosing where models will reside when not in use.  The default is CPU memory (RAM). To disable this option, the train device can be used (i.e. cuda).  