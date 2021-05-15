import { AnimationController, Animation } from '@ionic/angular';

export const enterAnimation = (baseEl: HTMLElement, opts?: any ): Animation => {
    const DURATION = 800;
    const animationCtrl = new AnimationController();

    if (opts.direction === 'forward') {
        return animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(DURATION)
        .easing('ease-in')
        .fromTo('opacity', 0, 1);
    } else {
        return null;
    }
}