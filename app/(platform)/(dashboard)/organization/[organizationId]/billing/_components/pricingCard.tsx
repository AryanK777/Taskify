'use client'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  features?: string[]
  buttonCta?: string
  title?: string
  description?: string
  amt?: string
  duration?: string
  highlightTitle?: string
  highlightDescription?: string
  customerId?: string
  planExists?: boolean
  isPro: boolean
}

const PricingCard = ({
  amt,
  buttonCta,
  description,
  duration,
  highlightDescription,
  highlightTitle,
  title,
  features,
  isPro
}: Props) => {
  const ProModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      ProModal.onOpen();
    }
  }

  return (
    <Card className="flex flex-col justify-between lg:w-full">
      <div>
        <CardHeader className="flex flex-col md:!flex-row justify-between">
          <div>
            <CardTitle className='font-semibold text-xl'>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <p className="text-6xl font-bold">
            {amt}
            <small className="text-xs font-light text-muted-foreground">
              {duration}
            </small>
          </p>
        </CardHeader>
        <CardContent>
            <ul>
                {features?.map((feature) => (
                    <li
                        key={feature}
                        className="list-disc ml-4 text-muted-foreground"
                    >
                        {feature}
                    </li>
                ))}
            </ul>
        </CardContent>
      </div>
      <CardFooter>
        <Card className="w-full">
          <div className="flex flex-col md:!flex-row items-center justify-between rounded-lg border gap-4 p-4">
            <div>
              <p>{highlightTitle}</p>
              <p className="text-sm text-muted-foreground">
                {highlightDescription}
              </p>
            </div>

            <Button
              className="md:w-fit w-full"
              onClick={onClick}
              variant="primary"
            >
              {buttonCta}
            </Button>
          </div>
        </Card>
      </CardFooter>
    </Card>
  )
}

export default PricingCard