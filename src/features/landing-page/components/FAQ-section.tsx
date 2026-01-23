import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/constants/faqs";
import { ArrowUpRight } from "lucide-react";
import Footer from "./footer";


export default function FAQsection() {
    return (
        <section className='pt-36 mt-10 relative space-y-16 overflow-hidden'>

            <img src="/images/faqs-left-side-top-bg.png" className="absolute left-0 top-0" />
            <img src="/images/faqs-left-side-botton-bg.png" className="absolute -left-10 top-200" />
            <img src="/images/faqs-right-side-bg.png" className="absolute right-0 top-80" />
            <img src="/images/faqs-top-line.png" className="absolute -z-10 right-0 bottom-50 opacity-36" />
            <img src="/images/faqs-bottom-line.png" className="absolute -z-10 right-0 bottom-16 opacity-30" />
            <div className="size-235 bg-primary/20 rounded-full -z-10 blur-3xl absolute bottom-10 -right-140"/>


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

            <div className="px-45 py-14 mt-70 border mx-auto max-w-270 text-center rounded-2xl space-y-9">
                <h1 className="font-bold text-[64px] text-center leading-tight">
                    Ready to Track Smarter?
                </h1>

                <p className="opacity-80">
                    Whether you&apos;re a developer, a startup, or a scaling enterprise—our platform adapts to your data needs. Monitor faster. Scale better.
                </p>

                <Button size="lg" className="font-bold">
                    Get started <ArrowUpRight />
                </Button>
            </div>

            <Footer/>
        </section>
    )
}
