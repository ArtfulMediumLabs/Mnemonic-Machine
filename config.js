var config = {}

config.images = ['ding.png', 'toaster.png', 'waffle.png', 'leggo.png'];
config.samples = [
    {file: 'bss_eggo_dingthing_ding_', count:17}, 
    {file: 'bss_eggo_dingthing_toaster_', count:11},
    {file: 'bss_eggo_dingthing_waffle_', count:6}, 
    {file: 'bss_eggo_dingthing_leggo_', count:11}
];

config.voiceTotal = config.images.length;

// Order of precedence: image, color, default gray (if undefined)
config.backgroundColor = '#FFD126';
config.backgroundImage = 'lukas-blazek-EWDvHNNfUmQ-unsplash.jpg';