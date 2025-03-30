import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronRight } from "lucide-react";

const NewsletterSignup = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Form schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t('newsletter.validation.nameRequired'),
    }),
    email: z.string().email({
      message: t('newsletter.validation.emailInvalid'),
    }),
  });

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Mutation for newsletter signup
  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const response = await apiRequest('POST', '/api/newsletter/subscribe', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('newsletter.success.title'),
        description: t('newsletter.success.message'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t('newsletter.error.title'),
        description: error instanceof Error ? error.message : t('newsletter.error.message'),
      });
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      name: values.name,
      email: values.email,
    });
  }

  return (
    <section id="newsletter" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16">
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
            <p className="text-neutral">{t('newsletter.subtitle')}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('newsletter.form.name')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('newsletter.form.namePlaceholder')}
                          {...field}
                          disabled={mutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('newsletter.form.email')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('newsletter.form.emailPlaceholder')}
                          {...field}
                          disabled={mutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              
              <div className="text-center pt-2">
                <Button 
                  type="submit"
                  className="inline-flex items-center justify-center w-full md:w-auto"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? t('newsletter.form.submitting') : t('newsletter.form.submit')}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </m.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;