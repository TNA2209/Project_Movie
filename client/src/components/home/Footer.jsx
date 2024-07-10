import disney from '../../assets/images/disney.png'

function Footer() {
  return (
    <div className="w-full text-[13px] text-white">
      <div className=" text-center">
        <img src={disney} alt="Logo" className="mx-auto w-32 h-32" />
      </div>
      <div className="flex justify-around mx-56 mb-2">
        <p>Subscriber Agreement</p>
        <p>Privacy Policy</p>
        <p>Your US State Privacy Rights</p>
        <p>Do Not Sell or Share My Personal Information</p>
        <p>Children's Online Privacy Policy</p>
        <p>Closed Captioning</p>
      </div>
      <div className="flex justify-around mx-64 pb-6">
        <p>Interest-Based Ads</p>
        <p>Supported Devices</p>
        <p>Help</p>
        <p>Gift Disney+</p>
        <p>About Us</p>
        <p>Disney+ Partner Program</p>
        <p>Disney Bundle</p>
        <p>Press</p>
      </div>
      <div className="text-center pb-16">
        <p>Content and platform availability may vary by TranNamAnh.<br />
          © 2024 Disney. All Rights Reserved.</p>

      </div>
    </div>
  )
}

export default Footer