import Image from 'next/image';
export default function Jupitor() {
  return (
    <div className="grid grid-cols-2 h-32 border border-gray-200 my-4">
      <div className="relative">
        <Image
          className="absolute top-0 left-0 w-full h-32 object-cover"
          src="/img/jupiter.jpeg"
          alt='jupitor'
          layout='fill'
        />
      </div>
      <p className="text-3xl font-bold text-left p-10">Jupiter</p>
    </div>
  );
}
