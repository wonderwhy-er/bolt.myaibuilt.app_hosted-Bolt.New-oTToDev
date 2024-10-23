# Experiment and Fork of Bolt.New

This project is a fork and experiment based on [Bolt.New](https://github.com/stackblitz/bolt.new). It was created during a live stream where I explored its features and extended its functionality.

## Live Stream
Check out the live stream where I hacked and explored Bolt.New:  
[![Exploring Bolt.New live: The Next Big Thing in Development with AI, Fullstack Apps in Your Browser!](https://i3.ytimg.com/vi/OOPaje_4Po8/mqdefault.jpg)](https://www.youtube.com/watch?v=OOPaje_4Po8)  
[Watch the full live stream here](https://www.youtube.com/watch?v=OOPaje_4Po8)

## Recap Video
For a quick overview and recap of the project, watch this video:  
[![Recap of Bolt.New Experiment](https://i3.ytimg.com/vi/wAjewqnzq7M/mqdefault.jpg)](https://www.youtube.com/watch?v=wAjewqnzq7M)  
[Watch the recap video here](https://www.youtube.com/watch?v=wAjewqnzq7M)

## Try a Live Hosted Demo here
You can try the version hosted on my domain here:  
[https://bolt.myaibuilt.app/](https://bolt.myaibuilt.app/)
or if its down alternative link
[CloudFlare](https://9356f8c3.bolt-2xk.pages.dev/)

## Key Differences from Bolt.New
- Instead of using Anthropic, it uses OpenRouter and allows setting the API key from the client
- Support for different models from OpenRouter, including free options.
- Default key with a zero-budget limit that allows usage of free OpenRouter models only.
- Adds support to download the current project state as a ZIP file.

## Ongoing Work
- Figure out how to host not on Cloudflare but on an Ubuntu droplet correctly (currently it's unstable).
- Fix how the Bolt.New terminal works and improves error detection and fixing like on commercial Bolt.New
- Add ZIP file upload functionality.
- Maybe add GitHub integration to upload/download repos
