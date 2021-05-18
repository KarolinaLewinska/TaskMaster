import { AnimationController, Animation } from '@ionic/angular';

export const pageAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const DURATION = 600;
    const animationController = new AnimationController();

    if (opts.direction === 'forward') {
        return animationController.create()
        .addElement(opts.enteringEl)
        .duration(DURATION)
        .easing('ease-in')
        .fromTo('opacity', 0, 1);
    } else {
        const rootAnimation = animationController.create()
        .addElement(opts.enteringEl)
        .duration(DURATION)
        .easing('ease-in')
        .fromTo('opacity', 0 ,1);

        const leavingAnimation = animationController.create()
        .addElement(opts.leavingEl)
        .duration(DURATION)
        .easing('ease-out')
        .fromTo('opacity', 1 ,0);

        return animationController.create().addAnimation([rootAnimation, leavingAnimation]);
    }
}