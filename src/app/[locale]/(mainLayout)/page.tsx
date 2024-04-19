import { GuidelinesPromotion, Hero, ProtocolsPromotion } from '..'

function Promotion() {
  return (
    <>
      <div className='flex flex-col gap-[40px] md:gap-[100px] pt-[70px] 3xl:py-[80px] bg-[url("/promotion-images/bg.webp")] bg-cover bg-no-repeat bg-center'>
        <Hero
          thumb='/promotion-images/hero1.webp'
          thumb1='/promotion-images/number1.webp'
          thumb2='/promotion-images/number2.webp'
          thumb3='/promotion-images/number3.webp'
        />
        <ProtocolsPromotion />
        <GuidelinesPromotion />
      </div>
    </>
  )
}

export default Promotion
