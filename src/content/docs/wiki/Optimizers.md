---
title: Optimizers
description: Information about optimizers used during training
---

WIP
# First Things First

![image](https://github.com/Nerogar/OneTrainer/assets/132208482/0b40c78e-7ad3-4c9c-988a-0efee36f30da)

There are three important notes about the optimizers.
* You can press the three dots (...) to open the settings for that optimizer.
* The default settings are the optimizer defaults, and are likely not the best for training diffusion models. 
* OneTrainer store the last settings you set for each optimizer, you can recall them by pressing "Load Defaults".

***

### The standard optimizers:
* Adagrad - Adaptive Gradient Algorithm
* ADAM - Adaptive Moment Estimation
* ADAMW - Adaptive Moment Estimation with weight decay
* LAMB -  Layer-wise Adaptive Moments optimizer for Batch training
* LARS - Layer-wise Adaptive Rate Scaling
* LION - Linear Integration Of Neurons
* RMSPROP - Root Mean Square Propagation
* SGD - Stochastic Gradient Descent

All standard optimizers are also available in 8bit.

If you aren't put off by complex mathematical formulas, a good introductory technical video that discusses some of these optimizers is [here](https://www.youtube.com/watch?v=NE88eqLngkg)

_**Note: The 8 bit versions save VRAM by using 8-bit quantization. There is a quality trade off for doing this.**_
***
### The DAdapt Family of Optimizers 
(Distributed Adaptive Decay Adaptation with Parametrized Timestep). 
These optimizers are adaptive versions of standard optimizers
* DADAPT_ADA_GRAD
* DADAPT_ADAM
* DADAPT_ADAN
* DADAPT_LION
* DADATP_SGD
***
### The Unique Adaptive Optimizer
* Prodigy - A special optimizer and a favorite as it is easy to use but it can also be hard to get the exact results you are looking for. While pure ADAM or ADAMW can provide better results, Prodigy is a good starting point if you have no idea what learning rate to use or number of steps are needed.  Prodigy is VRAM intensive (especially for 1024x models) and is likely only able to be used for LoRA or Embeddings training unless you have massive amounts of VRAM. Prodigy is ADAMW under the hood.  Tensorboard can be used to see what learning rate Prodigy stabilizes at for use in AdamW or AdamW 8bit.
***
### The Special 
* Adafactor - Adafactor can be used as a low memory ADAMW with a constant (or other) scheduler or as an adaptive optimizer with the Adafactor scheduler. 


***

### Prodigy Specific Settings Details
First and formost, note that Prodigy comes from https://github.com/konstmish/prodigy 
There are some excellent details of using it in the top level README there.

OneTrainer Default Values Listed. Recommended Values Listed After Default, if applicable
| |  |
|-----------------------------------------------------------|---------------------------------------------------------|
| Beta1: 0.9                 | Beta2: 0.999, ****Recommended 0.99 to 0.999**** |
| Beta3: 0                                          | EPS: 1e-08                                      |
| Weight Decay: 0.0 _**Recommended 0.001 to 0.01**_ | Decouple: True                                  |
| Bias Correction: False **_Recommended True_**  (unless constant scheduler/sdxl?)| Safeguard Warmup: False  **_Recommended True?_**    |
| Initial D: 1e-06     | D coefficient: 1.0 _**Recommended See Note**_                       |
| Growth Rate: inf   | FSDP in use: False                      |
| Learning rate: 1   |                       |

Prodigy Notes: **Learning Rate should be 1** and must be the same for both text encoders and unet. Otherwise, the lora will do nothing.

For Safeguard warmup, it might be better to set true for short training, but can be either true/false for longer (epoch=100) training.
For Bias Correction: sadly this is another settings where the best is really, "it depends, try both " :(

To adjust Prodigy you should use D coefficient instead, it acts as a LR multiplier. Using a D coefficient of 0.5 will slow Prodigy while a D coefficient of 2 will speed it up. Using a COSINE function can help force Prodigy to learn details at the end of a training run as Prodigy will never decrease the learning rate on it's own. Using a Beta 2 of 0.99 has been shown to help Prodigy converge better. Using weight decay can help Prodigy not overtrain. Other techniques include dropout for LoRAs (found on the LoRA tab). Enabling Bias correction helps Prodigy act more like ADAM.

<img width="323" alt="Capture d'écran 2024-05-02 133822" src="https://github.com/Nerogar/OneTrainer/assets/129741936/95b3691c-ed07-4bcf-98fc-55d121df3e8b">

D coeff effect on LR with Cosine
* Blue: 1.2
* Black: 1
* Yellow: 0.5


***

### Adafactor Specific Settings Details (Adaptive)
Default Values Listed. Recommended Values Listed After Default, if applicable
|  | |
|-----------------------------------------------------------|---------------------------------------------------------|
| EPS: 1e-30                    | EPS2: .001                |
| Clip Threshold: 1.0           | Decay Rate: -0.8          |
| Beta 1: Blank (Leave Blank unless you really know what this does)                | Weight Decay: 0.0        |
| Scale Parameter: True         | Relative Step: True       |
| Warmup Initialization: False  | Stochastic Rounding: True |
| Fuse Back Pass: False  |  |

Adafactor in adaptive mode notes: 
* It will ignore any LR value.
* Adafactor with relative step and scale parameter sets a learning rate too high for a Fine Tune. If you want to use adafactor for Fine Tunes, see the next setting. Use the Adafactor scheduler along with these settings for adaptive learning. Adafactor in relative step is slower as it needs to do more calculations to determine it's next move. Entering a value for Beta 1 for adafactor will significantly increase VRAM usage due to an EMA type function being enabled. Enabling "Fused Back Pass" can significantly reduce VRAM usage without any loss in quality but this option is not compatible with gradient accumulation.

***

### Adafactor Specific Settings Details (Low Memory ADAMW)
Default Values Listed. Recommended Values Listed After Default, if applicable
|  | |
|-----------------------------------------------------------|---------------------------------------------------------|
| EPS: 1e-30                    | EPS2: .001                |
| Clip Threshold: 1.0           | Decay Rate: -0.8          |
| Beta 1: Blank (Leave Blank unless you really know what this does)                    | Weight Decay: 0.0 _**Recommended 0.0 to 0.01**_      |
| Scale Parameter: True _**Required to be FALSE**_        | Relative Step: True  _**Required to be FALSE**_     |
| Warmup Initialization: False  | Stochastic Rounding: True |
| Fuse Back Pass: False  |  |

Adafactor in constant mode notes: A standard scheduler (constant, cosine, etc.) must be used with adafactor in this mode. Use a similar learning rate to AdamW or the default for your training task.  Adafactor in this mode uses less VRAM than ADAMW but more than ADAMW 8bit without the 8bit quantization loss in quality. Entering a value for Beta 1 for adafactor will significantly increase VRAM usage due to an EMA type function being enabled. Enabling "Fused Back Pass" can significantly reduce VRAM usage without any loss in quality but this option is not compatible with gradient accumulation.

***

### ADAM(W) Specific Settings Details

***

### All The Options
* adam_w_mode: Whether to use weight decay correction for Adam optimizer. type: boolean
* alpha: Smoothing parameter for RMSprop and others. type: float
* amsgrad: Whether to use the AMSGrad variant for Adam. type: bool
* Beta1: optimizer_momentum term. type: float
* Beta2: Coefficients for computing running averages of gradient. type: float
* Beta3: Coefficient for computing the Prodigy stepsize. type: float
* bias_correction: Whether to use bias correction in optimization algorithms like Adam. type: bool
* block_wise: Whether to perform block-wise model update. type: bool
* capturable: Whether some property of the optimizer can be captured. type: bool
* centered: Whether to center the gradient before scaling. Great for stabilizing the training process. type: bool
* clip_threshold: Clipping value for gradients. type: float
* Initial D: Initial D estimate for D-adaptation. type: float
* D Coefficient: Coefficient in the expression for the estimate of d. type: float
* Dampening: Dampening for optimizer_momentum. type: float
* Decay Rate: Rate of decay for moment estimation. type: float
* Decouple: Use AdamW style optimizer_decoupled weight decay. type: bool
* Differentiable: Whether the optimization function is optimizer_differentiable. type: bool
* EPS: A small value to prevent division by zero. type: float
* EPS 2: A small value to prevent division by zero. type: float
* ForEach: 'Whether to use a foreach implementation if available. This implementation is usually faster. type: bool
* FSDP in Use: Flag for using sharded parameters. type: bool
* Fused: Whether to use a fused implementation if available. This implementation is usually faster and requires less memory. type: bool
* Growth Rate: Limit for D estimate growth rate. type: float
* Initial Accumulator Value: Initial value for Adagrad optimizer. type: float
* Is Paged: Whether the optimizer's internal state should be paged to CPU. type: bool
* Log Every: Intervals at which logging should occur. type: int
* LR Decay: Rate at which learning rate decreases. type: float}
* Max Unorm: Maximum value for gradient clipping by norms. type: float
* Maximize: Whether to optimizer_maximize the optimization function. type: bool
* Min 8bit Size: Minimum tensor size for 8-bit quantization. type: int
* Optimizer Momentum: Factor to accelerate SGD in relevant direction. type: float
* Nesterov: Whether to enable Nesterov optimizer_momentum. type: bool
* No Prox: Whether to use proximity updates or not. type: bool
* Optim Bits: Number of bits used for optimization. type: int
* Percentile Clipping: Gradient clipping based on percentile values. type: float
* Relative Step: Whether to use a relative step size. type: bool
* Safeguard Warmup: Avoid issues during warm-up stage. type: bool
* Scale Parameter: Whether to scale the parameter or not. type: bool
* Stochastic Rounding: Stochastic rounding for weight updates. Improves quality when using bfloat16 weights. type: bool
* Bias Correction: Turn on Adam's bias correction. type: bool
* Use Triton: Whether Triton optimization should be used. type: bool
* Warmup Initialization: Whether to warm-up the optimizer initialization. type: bool
* Weight Decay: Regularization to prevent overfitting. type: float