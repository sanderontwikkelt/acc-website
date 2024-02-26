"use client";

import type { Libraries } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useQueryState } from "next-usequerystate";

import type { Media, Specialist } from "@acme/db";
import { cn } from "@acme/ui";

import { setHtml } from "~/lib/setHtml";
import { Dialog, DialogContent } from "../dialog";
import NextImage from "../NextImage";

const libraries = ["places"] as Libraries;
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 52.279723, // default latitude
  lng: 5.605069, // default longitude
};
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const GoogleMaps = ({
  title,
  placeholder,
  specialists,
}: {
  title: string;
  placeholder: string;
  specialists: (Specialist & {
    media: Media;
  })[];
}) => {
  const [address, setAddress] = useQueryState("address");
  const [selectedUserId, setSelectedUserId] = useQueryState("specialist");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const filteredSpecialists = useMemo(
    () =>
      address
        ? specialists.filter((user) =>
            user.address
              .toLowerCase()
              .includes(address ? address.toLowerCase() : ""),
          )
        : specialists,
    [specialists, address],
  );

  const selectedUser = useMemo(
    () =>
      selectedUserId &&
      filteredSpecialists.find((user) => +user.id === +selectedUserId),
    [selectedUserId, filteredSpecialists],
  ) as (Specialist & { media: Media }) | null;

  function success(pos: GeolocationPosition) {
    const crd = pos.coords;
    setLocation({ lat: crd.latitude, lng: crd.longitude });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            setLocation(center);
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div className="relative flex">
      <div className="h-[calc(100vh-6.25rem)] w-[32.5rem] overflow-auto bg-white md:min-w-[32.5rem]">
        <div {...setHtml(title)} className="mx-7 mb-6 mt-7 text-[22px]" />
        <div className="relative w-full px-7">
          <input
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={placeholder}
            className="outline-main h-[3.75rem] w-full border-b border-[#E6E6E6] transition-all focus:px-5"
          />
          <div className="absolute right-7 top-1/2 flex -translate-y-1/2 items-center space-x-5">
            <button>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.25">
                  <mask
                    id="mask0_28_147"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 0H20V20H0V0Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_28_147)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.18302 14.3792C4.74603 14.3792 1.9637 11.6014 1.9637 8.17001C1.9637 4.73863 4.74603 1.96086 8.18302 1.96086C11.62 1.96086 14.4023 4.73863 14.4023 8.17001C14.4023 11.6014 11.62 14.3792 8.18302 14.3792ZM20 18.5948L14.6318 13.2026C15.7119 11.8301 16.3666 10.0654 16.3666 8.16994C16.3666 3.66013 12.7005 0 8.18331 0C3.66612 0 0 3.66013 0 8.16994C0 12.6797 3.66612 16.3399 8.18331 16.3399C10.0818 16.3399 11.8494 15.6863 13.2242 14.6078L18.6252 20L20 18.5948Z"
                      fill="black"
                    />
                  </g>
                </g>
              </svg>
            </button>
            {!!address && (
              <button onClick={() => setAddress(null)}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.24"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.8174 9.00016L17.622 2.195C18.126 1.69229 18.126 0.879734 17.622 0.377029C17.1194 -0.125676 16.3082 -0.125676 15.8042 0.377029L8.99952 7.18219L2.19484 0.377029C1.69217 -0.125676 0.879671 -0.125676 0.377002 0.377029C-0.125667 0.879734 -0.125667 1.69229 0.377002 2.195L7.18168 9.00016L0.377002 15.8053C-0.125667 16.3093 -0.125667 17.1206 0.377002 17.6233C0.627694 17.874 0.956807 18 1.28592 18C1.61503 18 1.94415 17.874 2.19484 17.6233L8.99952 10.8181L15.8042 17.6233C16.0549 17.874 16.384 18 16.7131 18C17.0422 18 17.3726 17.874 17.622 17.6233C18.126 17.1206 18.126 16.3093 17.622 15.8053L10.8174 9.00016Z"
                    fill="#0F1012"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div>
          {filteredSpecialists.map((user) => (
            <button
              key={user.id}
              className={cn(
                "flex w-full items-center justify-between border-b border-[#E6E6E6] px-7 py-6 hover:bg-[#F6F6F6]",
                +selectedUserId === +user.id ? "bg-[#F6F6F6]" : "",
              )}
              onClick={() =>
                setSelectedUserId((prev) =>
                  +prev === +user.id ? null : String(user.id),
                )
              }
            >
              <div className="flex flex-col items-start">
                <p className="mb-1 text-base">{`${user.name} - ${user.title}`}</p>
                <p className="mb-3 text-xs opacity-70">{user.address}</p>
                <p className="text-xs font-bold">{user.email}</p>
                <p className="text-xs font-bold">{user.phoneNumber}</p>
              </div>
              <div className="h-20 w-20">
                {user.media ? (
                  <NextImage
                    image={{ ...user.media, src: user.media.url }}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="h-[calc(100vh-6.25rem)] w-full">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={location || center}
        >
          {location && (
            <Marker
              position={location}
              animation={google.maps.Animation.DROP}
            />
          )}
          {filteredSpecialists.map((user) => (
            <Marker
              icon="https://storage.googleapis.com/accuraat_cms_storage/marker.svg"
              position={{ lat: +user.lat, lng: +user.lng }}
              key={user.id}
              animation={
                user.id === +selectedUserId
                  ? google.maps.Animation.BOUNCE
                  : undefined
              }
              onClick={() => setSelectedUserId(String(user.id))}
            />
          ))}
        </GoogleMap>
      </div>
      <Dialog
        open={!!selectedUser}
        onOpenChange={() => setSelectedUserId(null)}
      >
        <DialogContent className="p-0">
          <button
            onClick={() => setSelectedUserId(null)}
            className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.41425 7.00025L13.7072 1.70725C14.0992 1.31625 14.0992 0.68425 13.7072 0.29325C13.3162 -0.09775 12.6853 -0.09775 12.2933 0.29325L7.00025 5.58625L1.70725 0.29325C1.31625 -0.09775 0.68425 -0.09775 0.29325 0.29325C-0.09775 0.68425 -0.09775 1.31625 0.29325 1.70725L5.58625 7.00025L0.29325 12.2933C-0.09775 12.6853 -0.09775 13.3162 0.29325 13.7072C0.48825 13.9022 0.74425 14.0002 1.00025 14.0002C1.25625 14.0002 1.51225 13.9022 1.70725 13.7072L7.00025 8.41425L12.2933 13.7072C12.4882 13.9022 12.7443 14.0002 13.0002 14.0002C13.2562 14.0002 13.5132 13.9022 13.7072 13.7072C14.0992 13.3162 14.0992 12.6853 13.7072 12.2933L8.41425 7.00025Z"
                fill="#0F1012"
              />
            </svg>
          </button>
          <div className="h-auto max-h-[20rem] w-full overflow-hidden">
            {selectedUser && (
              <NextImage
                image={{ ...selectedUser.media, src: selectedUser.media.url }}
                alt={selectedUser.name}
                className=" w-full object-cover"
              />
            )}
          </div>
          <div className="relative border-b border-[#E6E6E6] p-5">
            <Link
              href={`https://www.google.com/maps/place/${selectedUser?.address.replaceAll(
                " ",
                "+",
              )}`}
              target="_blank"
              className="absolute -top-6 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2ADC84] shadow-sm hover:opacity-100"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.875 10.9393L13.0607 1.12512C12.9215 0.985809 12.7561 0.875296 12.5741 0.799894C12.3921 0.724491 12.1971 0.685678 12.0001 0.685669C11.8031 0.68566 11.608 0.724457 11.426 0.799843C11.244 0.875229 11.0787 0.985728 10.9394 1.12503L1.12491 10.9394C0.8441 11.221 0.686414 11.6024 0.686432 12.0001C0.686449 12.3978 0.844169 12.7792 1.125 13.0608L10.9393 22.8749C11.0786 23.0142 11.2439 23.1248 11.4259 23.2002C11.6079 23.2756 11.8029 23.3144 11.9999 23.3144C12.1969 23.3144 12.392 23.2756 12.574 23.2002C12.756 23.1248 12.9214 23.0143 13.0606 22.875L22.8751 13.0607C23.1559 12.7791 23.3136 12.3976 23.3136 12C23.3136 11.6023 23.1558 11.2209 22.875 10.9393ZM16.4999 11.2521C16.4998 11.2761 16.4986 11.3 16.4963 11.324C16.4952 11.3353 16.493 11.3463 16.4914 11.3574C16.4896 11.3705 16.4881 11.3836 16.4854 11.3966C16.483 11.4092 16.4795 11.4215 16.4763 11.434C16.4735 11.4452 16.471 11.4565 16.4676 11.4677C16.4639 11.4799 16.4594 11.4917 16.4551 11.5036C16.4511 11.5148 16.4474 11.526 16.4429 11.537C16.4383 11.548 16.4329 11.5586 16.4279 11.5693C16.4225 11.5808 16.4174 11.5924 16.4113 11.6036C16.4059 11.6137 16.3997 11.6233 16.3939 11.6331C16.3873 11.6443 16.3809 11.6557 16.3736 11.6666C16.3665 11.6772 16.3586 11.6872 16.3509 11.6974C16.3439 11.7068 16.3374 11.7164 16.3299 11.7256C16.3159 11.7425 16.3011 11.7588 16.2857 11.7745C16.2838 11.7764 16.2822 11.7785 16.2803 11.7804L14.0303 14.0304C13.8897 14.1711 13.6989 14.2501 13.5 14.2501C13.3011 14.25 13.1103 14.171 12.9696 14.0304C12.829 13.8897 12.75 13.6989 12.75 13.5C12.75 13.3011 12.829 13.1103 12.9697 12.9697L13.9393 12H10.5C10.1023 12.0005 9.72105 12.1587 9.43985 12.4399C9.15864 12.7211 9.00046 13.1023 9 13.5V14.25C9 14.4489 8.92099 14.6397 8.78034 14.7804C8.63968 14.921 8.44892 15 8.25001 15C8.05109 15 7.86033 14.921 7.71968 14.7804C7.57902 14.6397 7.50001 14.4489 7.50001 14.25V13.5C7.50092 12.7047 7.81728 11.9421 8.37969 11.3797C8.9421 10.8173 9.70463 10.5009 10.5 10.5H13.9393L12.9697 9.53039C12.829 9.38974 12.75 9.19898 12.75 9.00006C12.75 8.80114 12.829 8.61037 12.9696 8.46971C13.1103 8.32905 13.3011 8.25002 13.5 8.25001C13.6989 8.25 13.8897 8.32901 14.0303 8.46966L16.2803 10.7197C16.2822 10.7216 16.2838 10.7236 16.2857 10.7256C16.3011 10.7413 16.3159 10.7575 16.3299 10.7745C16.3374 10.7837 16.3439 10.7933 16.3509 10.8027C16.3586 10.8129 16.3665 10.8229 16.3736 10.8335C16.3809 10.8444 16.3873 10.8558 16.3939 10.8669C16.3998 10.8768 16.4059 10.8863 16.4113 10.8965C16.4174 10.9077 16.4225 10.9193 16.4279 10.9307C16.4329 10.9415 16.4383 10.952 16.4429 10.9631C16.4474 10.974 16.4511 10.9853 16.4551 10.9964C16.4594 11.0084 16.4639 11.0201 16.4676 11.0324C16.471 11.0435 16.4735 11.0548 16.4763 11.0661C16.4795 11.0786 16.483 11.0908 16.4854 11.1035C16.4881 11.1165 16.4896 11.1296 16.4914 11.1426C16.493 11.1538 16.4951 11.1648 16.4962 11.1761C16.4986 11.2 16.4999 11.224 16.4999 11.248L16.5 11.25L16.4999 11.2521Z"
                  fill="black"
                />
              </svg>
            </Link>
            <p className="mb-4 items-center text-xl">{`${selectedUser?.name} - ${selectedUser?.title}`}</p>
            <div className="grid grid-cols-[24px_1fr] gap-4 text-sm">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href={`https://www.google.com/maps/place/${selectedUser?.address.replaceAll(
                  " ",
                  "+",
                )}`}
                target="_blank"
                className="hover:underline"
              >
                {selectedUser?.address}
              </Link>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.0779 15.9724L14.9886 12.8422C14.8994 12.7874 14.7997 12.7518 14.6959 12.7378L12.5566 12.4494C12.396 12.4278 12.2327 12.4587 12.0911 12.5377C11.9495 12.6166 11.8374 12.7393 11.7714 12.8874L10.4871 15.7691C10.4274 15.9031 10.4083 16.0517 10.4322 16.1965C10.4561 16.3412 10.5219 16.4758 10.6215 16.5835L12.384 18.4899C12.4639 18.5763 12.5223 18.6804 12.5546 18.7936C12.5868 18.9067 12.592 19.0259 12.5696 19.1415L12.2106 20.9974"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.08928 5.21307L5.25076 7.19586C5.17599 7.37265 5.17186 7.57138 5.23921 7.75113L6.31648 10.6263C6.36059 10.744 6.4336 10.8488 6.52878 10.9309C6.62397 11.0131 6.73828 11.07 6.8612 11.0964L8.87025 11.5282C8.98173 11.5521 9.08628 11.6012 9.17595 11.6716C9.26562 11.7421 9.33805 11.832 9.38773 11.9347L9.74451 12.6717C9.8059 12.7986 9.9018 12.9056 10.0212 12.9804C10.1406 13.0553 10.2787 13.095 10.4196 13.095H11.6789"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.2929 3.29517L15.168 4.86252C15.2507 5.01068 15.2807 5.18253 15.2531 5.34997C15.2256 5.51741 15.142 5.67055 15.0162 5.78437L12.4933 8.06602C12.4505 8.10474 12.4033 8.13839 12.3528 8.1663L11.2051 8.80008C11.0941 8.86139 10.9694 8.89354 10.8426 8.89354H8.84142C8.69385 8.89354 8.54956 8.93708 8.42661 9.0187C8.30367 9.10031 8.20753 9.21639 8.15024 9.35239L7.36957 11.2057"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href={selectedUser?.website || "#"}
                target="_blank"
                className="hover:underline"
              >
                {selectedUser?.website}
              </Link>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66965 11.7014C9.44762 13.2919 10.7369 14.5753 12.3309 15.346C12.4475 15.4013 12.5765 15.4252 12.7052 15.4155C12.8339 15.4058 12.9579 15.3627 13.0648 15.2905L15.4119 13.7254C15.5157 13.6562 15.6352 13.6139 15.7594 13.6025C15.8837 13.5911 16.0088 13.6109 16.1235 13.66L20.5144 15.5419C20.6636 15.6052 20.7881 15.7154 20.8693 15.8556C20.9504 15.9959 20.9838 16.1588 20.9643 16.3197C20.8255 17.4057 20.2956 18.4039 19.4739 19.1273C18.6521 19.8508 17.5948 20.2499 16.5 20.25C13.1185 20.25 9.87548 18.9067 7.48439 16.5156C5.0933 14.1245 3.75 10.8815 3.75 7.49997C3.75006 6.40513 4.14918 5.34786 4.87264 4.5261C5.5961 3.70435 6.59428 3.17448 7.68028 3.03569C7.84117 3.01622 8.00403 3.04956 8.14432 3.1307C8.28461 3.21183 8.39473 3.33636 8.4581 3.48552L10.3416 7.88032C10.3903 7.994 10.4101 8.11796 10.3994 8.24116C10.3886 8.36436 10.3475 8.48299 10.2798 8.58647L8.72011 10.9696C8.64912 11.0768 8.60716 11.2006 8.59831 11.3288C8.58947 11.4571 8.61405 11.5855 8.66965 11.7014V11.7014Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href={`tel:${selectedUser?.phoneNumber}`}
                target="_blank"
                className="hover:underline"
              >
                {selectedUser?.phoneNumber}
              </Link>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 5.25L12 13.5L3 5.25"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href={`mailto:${selectedUser?.email}`}
                target="_blank"
                className="hover:underline"
              >
                {selectedUser?.email}
              </Link>
            </div>
          </div>
          <div className="p-5 text-sm">
            <p {...setHtml((selectedUser?.description as string) || "")} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoogleMaps;
