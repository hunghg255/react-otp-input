import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "React OTP ",
  description: "React OTP input ",
  outDir: "docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Playground', link: 'https://reactjs-otp-input-demo.vercel.app/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hunghg255/reactjs-otp-input' }
    ]
  }
})
