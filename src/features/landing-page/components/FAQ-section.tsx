import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/faqs";


export default function FAQsection() {
    return (
        <section className='pt-36 mt-10 relative space-y-16'>

            <img src="/images/faqs-left-side-top-bg.png" className="absolute left-0 top-0"/>
            <img src="/images/faqs-left-side-botton-bg.png" className="absolute -left-10 top-200"/>
            <img src="/images/faqs-right-side-bg.png" className="absolute right-0 top-80"/>


            <div className=''>
                <h1 className='font-bold text-[64px] text-center leading-tight'>
                    Frequently Asked <br />
                    Questions
                </h1>
                <p className='text-[18px] text-foreground/80 max-w-2xl text-center mt-5 mx-auto'>
                    Got questions? We&apos;ve got answers. Find everything you need to know about using our platform, plans, and features.
                </p>
            </div>


            <Accordion
                type="single"
                collapsible
                defaultValue={faqs[0].question}
                className="max-w-222.5 mx-auto"

            >
                {faqs.map((item, index) => (
                    <AccordionItem key={index} value={item.question}>
                        <AccordionTrigger className="text-xl">
                            {item.question}
                            </AccordionTrigger>
                        <AccordionContent className="text-[18px] opacity-75">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
