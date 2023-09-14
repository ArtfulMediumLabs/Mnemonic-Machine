var config = {}

config.duration = 4.0;

config.images = ['ding.png', 'toaster.png', 'waffle.png', 'leggo.png'];
config.samples = [
    {file: 'bss_eggo_dingthing_ding_', count:17, min: 1.4, max: 3.0}, 
    {file: 'bss_eggo_dingthing_toaster_', count:11, max: 1.5},
    {file: 'bss_eggo_dingthing_waffle_', count:6, min: 3.0}, 
    {file: 'bss_eggo_dingthing_leggo_', count:11}
];

config.voiceCount = config.images.length;

// Order of precedence: image, color, default gray (if undefined)
config.backgroundColor = '#FFD126';
config.backgroundImage = 'lukas-blazek-EWDvHNNfUmQ-unsplash.jpg';