import Image from "next/image";
import { sliderImages } from "@/constants";

export const LogoSlider = () => {
    return (
        <section className="w-full max-w-4xl mx-auto overflow-hidden py-8 mt-4 mb-8">
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <div
                    className="flex animate-slider-left whitespace-nowrap"
                    style={{ width: "max-content" }}
                >
                    {[...sliderImages, ...sliderImages, ...sliderImages].map(
                        (src, idx) => (
                            <Image
                                key={idx}
                                src={src}
                                alt="Partner Logo"
                                width={80}
                                height={36}
                                className="h-7 sm:h-9 md:h-8 w-auto grayscale opacity-40 select-none pointer-events-none transition-all duration-300 hover:opacity-100 hover:grayscale-0 mr-16"
                                draggable={false}
                            />
                        ),
                    )}
                </div>
            </div>
        </section>
    );
};
