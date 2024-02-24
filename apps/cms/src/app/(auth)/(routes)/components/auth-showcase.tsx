import { signIn } from "@acme/auth";
import { Input } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Separator } from "@acme/ui/separator";

export async function AuthShowcase() {

  return (
    <div className="space-y-5">
      <form className="space-y-2" action={async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    await signIn("email", { email });
  }}>
        <Input
          className="w-full"
          placeholder="E-mail"
          type="email"
          name="email"
          required
        />
        {/* <Input
          className="w-full"
          placeholder="**********"
          type="password"
          name="password"
          required
        /> */}
        <Button className="w-full">
          <svg
            width="668"
            height="534"
            viewBox="0 0 668 534"
            className="mr-2 h-auto w-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M132.934 0.333266H535.066C549.686 0.332933 562.303 0.332597 572.746 1.04493C583.74 1.79526 594.736 3.44527 605.603 7.94527C630.103 18.0946 649.573 37.5623 659.72 62.0649C664.22 72.9293 665.87 83.9263 666.623 94.9206C667.333 105.363 667.333 117.979 667.333 132.6V401.4C667.333 416.02 667.333 428.637 666.623 439.08C665.87 450.073 664.22 461.07 659.72 471.937C649.573 496.437 630.103 515.907 605.603 526.053C594.736 530.553 583.74 532.203 572.746 532.957C562.303 533.667 549.686 533.667 535.066 533.667H132.934C118.312 533.667 105.696 533.667 95.2538 532.957C84.2595 532.203 73.2625 530.553 62.3982 526.053C37.8955 515.907 18.4278 496.437 8.27852 471.937C3.77852 461.07 2.12852 450.073 1.37818 439.08C0.665849 428.637 0.666185 416.02 0.666518 401.4V132.601C0.666185 117.979 0.665849 105.363 1.37818 94.9206C2.12852 83.9263 3.77852 72.9293 8.27852 62.0649C18.4278 37.5623 37.8955 18.0946 62.3982 7.94527C73.2625 3.44527 84.2595 1.79526 95.2538 1.04493C105.696 0.332597 118.312 0.332933 132.934 0.333266ZM77.9149 76.2589C90.0379 62.4046 111.097 61.0006 124.951 73.1233L312.05 236.833C324.617 247.83 343.383 247.83 355.95 236.833L543.05 73.1233C556.903 61.0006 577.963 62.4046 590.083 76.2589C602.207 90.1136 600.803 111.172 586.95 123.295L399.85 287.007C362.146 319.997 305.853 319.997 268.15 287.007L81.0509 123.295C67.1962 111.172 65.7922 90.1136 77.9149 76.2589Z"
              fill="#fff"
            />
          </svg>
          Doorgaan met E-mail
        </Button>
      </form>
      <div className="relative">
        <Separator />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 text-sm text-gray-600">
          OF
        </div>
      </div>
      <form className="space-y-2" action={async () => {
    "use server";
    await signIn("google");
  }}>
      <Button
        variant="outline"
        className="w-full"
      >
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          className="mr-2 h-5 w-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M172.121 400C172.121 374.595 176.341 350.24 183.871 327.395L52.0577 226.738C26.3679 278.898 11.894 337.671 11.894 400C11.894 462.275 26.3501 521.013 52.0043 573.138L183.747 472.284C176.287 449.546 172.121 425.28 172.121 400Z"
            fill="#FBBC05"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M403.561 168.889C458.75 168.889 508.599 188.444 547.765 220.444L661.705 106.666C592.273 46.222 503.258 8.88867 403.561 8.88867C248.781 8.88867 115.757 97.4042 52.0576 226.738L183.871 327.395C214.243 235.2 300.819 168.889 403.561 168.889Z"
            fill="#EB4335"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M403.561 631.111C300.819 631.111 214.243 564.8 183.871 472.604L52.0576 573.244C115.757 702.595 248.781 791.111 403.561 791.111C499.092 791.111 590.297 757.191 658.749 693.635L533.63 596.906C498.326 619.146 453.872 631.111 403.561 631.111Z"
            fill="#34A853"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M777.424 400C777.424 376.889 773.864 352 768.523 328.889H403.561V480H613.636C603.132 531.52 574.541 571.129 533.629 596.906L658.749 693.635C730.656 626.898 777.424 527.484 777.424 400Z"
            fill="#4285F4"
          />
        </svg>
        Doorgaan met Google
      </Button>
      </form>
    </div>
  );
}
