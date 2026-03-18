import Image from "next/image";
import { sliderImages } from "@/constants";

export const LogoSlider = () => {
    return (
        <section className="w-full max-w-4xl mx-auto overflow-hidden py-8 mt-4 mb-8">
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <div
                    className="flex animate-slider-left whitespace-nowrap items-center"
                    style={{ width: "max-content" }}
                >
                    {[...sliderImages, ...sliderImages].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 mr-16 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        >
                            {item.startsWith("<svg") ? (
                                <div
                                    className="h-7 sm:h-9 md:h-8 w-8 flex items-center"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                    style={{
                                        "& svg": {
                                            height: "100%",
                                            width: "auto",
                                        },
                                    }}
                                />
                            ) : (
                                <Image
                                    src={item}
                                    alt="Partner Logo"
                                    width={80}
                                    height={36}
                                    className="h-7 sm:h-9 md:h-8 w-auto select-none pointer-events-none"
                                    draggable={false}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
