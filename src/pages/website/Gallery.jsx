const Gallery = () => {
  const images = [
    "/assets/img/gallery/gallery-1.jpg",
    "/assets/img/gallery/gallery-2.jpg",
    "/assets/img/gallery/gallery-3.jpg",
    "/assets/img/gallery/gallery-4.jpg",
    "/assets/img/gallery/gallery-5.jpg",
    "/assets/img/gallery/gallery-6.jpg",
    "/assets/img/gallery/gallery-7.jpg",
    "/assets/img/gallery/gallery-8.jpg",
  ];

  return (
    <section
      id="gallery"
      className="scroll-mt-[107px] bg-white py-[65px] md:py-[75px] lg:py-[80px]"
    >
      {/* ================= SECTION TITLE ================= */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[850px] text-center">
          <h2 className="text-[30px] font-semibold leading-[1.2] text-[#294b68] md:text-[32px]">
            Gallery
          </h2>

          {/* Title Line */}
          <div className="mx-auto mt-[15px] flex w-[120px] items-center justify-center">
            <span className="h-[1px] w-[30px] bg-[#bdbdbd]"></span>

            <span className="h-[3px] w-[52px] bg-[#1976c8]"></span>

            <span className="h-[1px] w-[30px] bg-[#bdbdbd]"></span>
          </div>

          <p className="mt-[18px] text-[14px] leading-[1.7] text-[#444] md:text-[15px]">
            Take a look at HospitalCare and our healthcare environment.
          </p>
        </div>
      </div>

      {/* ================= GALLERY ================= */}
      <div className="mt-[60px] w-full">
        <div className="grid grid-cols-1 gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden"
            >
              <a
                href={image}
                className="block h-full w-full"
                aria-label={`View HospitalCare gallery image ${index + 1
                  }`}
              >
                <img
                  src={image}
                  alt={`HospitalCare gallery ${index + 1}`}
                  className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] sm:h-[260px] lg:h-[340px] xl:h-[370px]"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#1976c8]/0 transition-all duration-300 group-hover:bg-[#1976c8]/30">
                  <div className="flex h-[45px] w-[45px] scale-75 items-center justify-center rounded-full bg-white text-[#1976c8] opacity-0 shadow-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <i className="bi bi-search text-[18px]"></i>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;