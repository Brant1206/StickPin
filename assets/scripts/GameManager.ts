import { _decorator, Component, Input, input, instantiate, Node, Prefab } from 'cc';
import { Pin } from './Pin';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    p1: Node = null;
    @property(Node)
    p2: Node = null;
    @property(Node)
    p3: Node = null;

    @property(Prefab)
    pinPrefab: Prefab = null;

    @property
    moveDuration:number = 0.3;

    private curPin: Pin = null;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start() {
        this.pinSpawner();
    }

    update(deltaTime: number) {
        
    }

    onTouchStart() {
        if(this.curPin) {
            this.curPin.moveTo(this.p1.getPosition(), this.moveDuration);;
            this.pinSpawner();
        }
    }

    pinSpawner() {
        const pinNode = instantiate(this.pinPrefab);
        this.node.addChild(pinNode);
        pinNode.setPosition(this.p3.getPosition());

        this.curPin = pinNode.getComponent(Pin);
        if(this.curPin) {
            this.curPin.moveTo(this.p2.getPosition(), this.moveDuration);
        }else{
            console.error("Pin component not found");
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
}


