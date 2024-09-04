---
title: Custom Scheduler
description: Learn how to use the custom scheduler feature in OneTrainer to incorporate schedulers from other libraries like PyTorch.
---
This page is about the custom scheduler feature found on the training tab.  This option allows you to use a scheduler not currently found in OneTrainer, but may exist elsewhere, for example in PyTorch. This feature was primarily added to be able to use the OneCycle scheduler.

# Selecting

In order to use the custom scheduler, you need to select it on the training tab.

![image](https://github.com/Nerogar/OneTrainer/assets/132208482/1e5d02c2-e629-4dec-b883-aa344c464f7f)


# Configuring

In order to actually define the custom scheduler, you need to click the three dots (...) which will open up the custom scheduler window.

![image](https://github.com/Nerogar/OneTrainer/assets/132208482/3d465c19-a42c-4c66-b683-464cb169c737)

## Settings

On this window, normally you will be presented with a blank template which you will need to fill in with information in order to use your custom scheduler of choice. There are tooltips for most fields if you hold your mouse over them.

* Class Name (Default: Blank) - This is where you define the module and class name of the scheduler you want to use. In this example it is torch.optim.lr_scheduler.MultiStepLR
* add parameter - This button will add two blank fields. The parameter name, and the value that your custom scheduler is looking for. There are some OneTrainer variables that you can pass forward, which the tooltip shows.

In the above example, two parameters are passed to the custom scheduler MultiStepLR. The first is the milestones with values of 50,100,150 and the gamma of .5.  In this example, the custom scheduler will reduce the learning rate by 0.5 at steps of 50, 100 and 150 (after warmup is complete if you use it).
This would create the following LRs as an example for a pivotal tuning.

| Step | LoRA Unet LR | Emebedding LR |
|------|--------------|---------------|
| 0    | 1e-4         | 1e-3          |
| 50   | 5e-5         | 5e-4          |
| 100  | 2.5e-5       | 2.5e-4        |
| 150+ | 1.25e-5      | 1.25e-4       |

# Custom Schedulers

PyTorch includes custom schedulers not standardly include in OneTrainer. They can be found here: (https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate)

Each scheduler listed here will list the name and parameters it is looking for.

Some Examples:
* MultiStep Linear: https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.MultiStepLR.html#torch.optim.lr_scheduler.MultiStepLR
* OneCycle: https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.OneCycleLR.html#torch.optim.lr_scheduler.OneCycleLR

# Additional Reading
Medium has various articles on the schedulers, including OneCycle, but are some behind a paywall.

This page goes deeply into OneCycle: https://www.deepspeed.ai/tutorials/one-cycle/

This image shows what each scheduler in PyTorch looks like graphically:
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/62788047-0fff-4d05-a95e-432e615d6947)
