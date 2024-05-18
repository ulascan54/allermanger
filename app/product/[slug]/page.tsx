import { fullProduct } from "@/app/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == "product" && code == "${slug}"][0] {
    _id,
    images,
    code,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    "allergies": *[_type == "allergies" && references(^._id)] {
      name
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white py-8">
      <hr className="border-2 border-primary border-opacity-65" />

      <div className="mx-auto max-w-[800px] px-4 md:px-8 flex items-center justify-center">
        <div className="grid gap-8 md:grid-cols-2">
          {data?.images && data.images[0]?.asset?._ref ? (
            <Image
              src={urlFor(data.images[0].asset._ref).url()}
              width={200}
              height={200}
              alt={data.name}
              className="object-center object-contain cursor-pointer max-w-[250px] h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
          <div className="md:py-8">
            <div className="mb-4">
              <span className="mb-1 inline-block text-gray-500">
                {data?.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data?.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3">
              {/* <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button> */}
              {/* <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span> */}
            </div>
                <span className="font-bold">Allergies:</span><br/>
                {data?.allergies && data.allergies.length > 0 ? (
                  <ul>
                    {data.allergies.map((allergy, index) => (
                      <li key={index}>{allergy.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No allergies found for this product.</span>
                )}
            <div className="mb-4">
              <div className="flex items-end gap-2">
                {/* <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data?.code}
                </span> */}
                {/* <span className="mb-0.5 text-red-500 line-through">
                  ${parseInt(data?.code) + 30}
                </span> */}
                <span className="mb-0.5">
                  <span className="font-bold text-sm text-gray-500">Code: <br/>{data?.code}</span>
                </span>
              </div>

            </div>
            {/* <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div> */}
            <p className="text-base text-gray-500 tracking-wide">
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
